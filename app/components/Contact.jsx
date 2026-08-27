"use client";

import { useState } from "react";

export default function Contact({ t }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMessage, setServerMessage] = useState("");

  const onChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = t.form.required;
    if (!form.email.trim()) nextErrors.email = t.form.required;
    if (!form.phone.trim()) nextErrors.phone = t.form.required;
    if (!form.message.trim()) nextErrors.message = t.form.required;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email.trim())) {
      nextErrors.email = t.form.invalidEmail;
    }
    const digits = form.phone.replace(/[^\d]/g, "");
    if (form.phone && digits.length < 7) {
      nextErrors.phone = t.form.invalidPhone;
    }
    return nextErrors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setServerMessage("");
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json();
      if (!response.ok) {
        setStatus("error");
        if (payload?.errors) {
          const mapped = {};
          Object.entries(payload.errors).forEach(([field, code]) => {
            if (code === "required") mapped[field] = t.form.required;
            else if (field === "email" && code === "invalid")
              mapped[field] = t.form.invalidEmail;
            else if (field === "email" && code === "not_valid")
              mapped[field] = t.form.emailNotValid;
            else if (field === "phone" && code === "invalid")
              mapped[field] = t.form.invalidPhone;
          });
          if (Object.keys(mapped).length > 0) setErrors(mapped);
        } else {
          setServerMessage(t.form.error);
        }
        return;
      }
      setStatus("success");
      setServerMessage(t.form.success);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus("error");
      setServerMessage(t.form.error);
    }
  };

  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="contact-text reveal">
          <div className="section-tag" style={{ color: "var(--green-light)" }}>
            {t.tag}
          </div>
          <h2 className="section-title" style={{ color: "white" }}>
            {t.titleMain}
            <br />
            <span style={{ color: "var(--green-light)" }}>{t.titleHighlight}</span>
          </h2>
          <p className="section-desc" style={{ color: "rgba(255,255,255,0.82)" }}>
            {t.desc}
          </p>
          <div className="contact-details">
            {t.details.map((item) => (
              <div className="contact-item" key={item.text}>
                <div className="contact-item-icon">{item.icon}</div>
                {item.href && !item.actions ? (
                  <a
                    href={item.href}
                    className="contact-link"
                    dir={item.dir || undefined}
                  >
                    {item.text}
                  </a>
                ) : (
                  <span dir={item.dir || undefined}>{item.text}</span>
                )}
                {item.actions && (
                  <div className="contact-actions">
                    {item.actions.map((action) => (
                      <a
                        key={action.type}
                        href={action.href}
                        className="contact-action"
                        aria-label={
                          action.type === "whatsapp"
                            ? "WhatsApp"
                            : "Call"
                        }
                        target={action.type === "whatsapp" ? "_blank" : undefined}
                        rel={action.type === "whatsapp" ? "noreferrer" : undefined}
                      >
                        {action.type === "whatsapp" ? (
                          <svg viewBox="0 0 32 32" aria-hidden="true">
                            <path d="M16.02 3.2a12.8 12.8 0 0 0-10.96 19.47L3.2 29l6.62-1.73A12.8 12.8 0 1 0 16.02 3.2zm0 2.63a10.17 10.17 0 0 1 8.74 15.4l-.55.92.97 3.62-3.7-.97-.9.53a10.17 10.17 0 1 1-4.56-19.5zm-4.98 6.8c-.2 0-.5.07-.77.36-.3.32-1.02 1-1.02 2.44s1.05 2.83 1.2 3.04c.16.2 2.06 3.28 5.14 4.46 2.56 1 3.08.8 3.64.74.56-.06 1.82-.74 2.08-1.44.26-.7.26-1.3.18-1.44-.08-.13-.3-.2-.63-.36-.33-.16-1.95-.96-2.25-1.07-.3-.12-.52-.16-.74.16-.2.32-.86 1.07-1.05 1.3-.2.2-.4.24-.73.08-.33-.16-1.4-.52-2.67-1.65-1-.9-1.67-2-1.86-2.33-.2-.32-.02-.48.14-.64.16-.16.33-.4.5-.6.16-.2.2-.36.3-.6.1-.2.05-.4-.02-.56-.07-.16-.7-1.7-.96-2.32-.25-.6-.5-.52-.77-.52h-.65z" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1 .3 2 .5 3.1.5.7 0 1.3.6 1.3 1.3v3.4c0 .7-.6 1.3-1.3 1.3C9.7 21.4 2.6 14.3 2.6 5.6 2.6 4.9 3.2 4.3 4 4.3h3.4c.7 0 1.3.6 1.3 1.3 0 1.1.2 2.1.5 3.1.1.4 0 .9-.3 1.2l-2.3 2z" />
                          </svg>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="contact-form reveal">
          <form onSubmit={onSubmit} noValidate>
            <div className="form-group">
              <label className="form-label">{t.form.name}</label>
              <input
                className="form-input"
                type="text"
                placeholder={t.form.namePlaceholder}
                value={form.name}
                onChange={onChange("name")}
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">{t.form.email}</label>
              <input
                className="form-input"
                type="email"
                placeholder={t.form.emailPlaceholder}
                dir="ltr"
                value={form.email}
                onChange={onChange("email")}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">{t.form.phone}</label>
              <input
                className="form-input"
                type="tel"
                placeholder={t.form.phonePlaceholder}
                dir="ltr"
                value={form.phone}
                onChange={onChange("phone")}
              />
              {errors.phone && <div className="form-error">{errors.phone}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">{t.form.message}</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder={t.form.messagePlaceholder}
                value={form.message}
                onChange={onChange("message")}
              />
              {errors.message && (
                <div className="form-error">{errors.message}</div>
              )}
            </div>
            {serverMessage && (
              <div
                className={`form-note ${
                  status === "success" ? "success" : "error"
                }`}
              >
                {serverMessage}
              </div>
            )}
            <button className="form-submit" disabled={status === "sending"}>
              {status === "sending" ? t.form.sending : t.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
