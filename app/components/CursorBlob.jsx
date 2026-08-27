"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorBlob() {
  const blobRef = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob || typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    const offset = () => blob.offsetWidth / 2;

    const quickX = gsap.quickTo(blob, "x", {
      duration: 0.6,
      ease: "power3.out",
    });
    const quickY = gsap.quickTo(blob, "y", {
      duration: 0.6,
      ease: "power3.out",
    });

    const onMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      quickX(lastX - offset());
      quickY(lastY - offset());
    };

    window.addEventListener("mousemove", onMove);
    // Initialize at center
    quickX(lastX - offset());
    quickY(lastY - offset());

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div ref={blobRef} className="cursor-blob" aria-hidden="true" />;
}
