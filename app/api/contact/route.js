import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { promises as dns } from "node:dns";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitize = (value) => (value || "").toString().trim();

const validatePayload = (payload) => {
  const errors = {};
  const name = sanitize(payload.name);
  const email = sanitize(payload.email);
  const phone = sanitize(payload.phone);
  const message = sanitize(payload.message);

  if (!name) errors.name = "required";
  if (!email) errors.email = "required";
  if (!phone) errors.phone = "required";
  if (!message) errors.message = "required";
  if (email && !emailRegex.test(email)) errors.email = "invalid";
  const digits = phone.replace(/[^\d]/g, "");
  if (phone && digits.length < 7) errors.phone = "invalid";

  return {
    errors,
    data: { name, email, phone, message },
  };
};

const hasMxRecords = async (email) => {
  const domain = email.split("@")[1];
  if (!domain) return false;
  try {
    const records = await dns.resolveMx(domain);
    return Array.isArray(records) && records.length > 0;
  } catch (error) {
    return false;
  }
};

const validateWithNeverBounce = async (email) => {
  const apiKey = process.env.NEVERBOUNCE_API_KEY;
  if (!apiKey) return { status: "skipped" };
  const apiUrl =
    process.env.NEVERBOUNCE_API_URL ||
    "https://api.neverbounce.com/v4/single/check";
  try {
    const url = new URL(apiUrl);
    url.searchParams.set("key", apiKey);
    url.searchParams.set("email", email);
    const response = await fetch(url.toString(), { method: "GET" });
    if (!response.ok) return { status: "skipped" };
    const data = await response.json();
    if (data.status !== "success") return { status: "skipped", data };
    return { status: data.result || "unknown", data };
  } catch (error) {
    return { status: "skipped" };
  }
};

export async function POST(request) {
  try {
    const payload = await request.json();
    const { errors, data } = validatePayload(payload);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, code: "invalid_data", errors },
        { status: 400 }
      );
    }

    const mxOk = await hasMxRecords(data.email);
    if (!mxOk) {
      return NextResponse.json(
        { ok: false, code: "email_domain", errors: { email: "not_valid" } },
        { status: 400 }
      );
    }

    const nbResult = await validateWithNeverBounce(data.email);
    if (nbResult.status !== "skipped") {
      const allowed = new Set(["valid", "catchall", "unknown"]);
      if (!allowed.has(nbResult.status)) {
        return NextResponse.json(
          { ok: false, code: "email_not_valid", errors: { email: "not_valid" } },
          { status: 400 }
        );
      }
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    const to =
      process.env.SMTP_TO || "creativeindustry33@hotmail.com";

    if (!host || !user || !pass || !from) {
      console.error("[/api/contact] email_service_config: missing SMTP env vars", {
        hasHost: Boolean(host),
        hasUser: Boolean(user),
        hasPass: Boolean(pass),
        hasFrom: Boolean(from),
      });
      return NextResponse.json(
        { ok: false, code: "email_service_config" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: data.email,
      subject: `New message from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\n${data.message}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[/api/contact] server_error:", error);
    return NextResponse.json(
      { ok: false, code: "server_error" },
      { status: 500 }
    );
  }
}
