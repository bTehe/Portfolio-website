"use client";

import { motion, type Transition } from "framer-motion";
import { useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { apiUrl } from "@/lib/api";

const buttonTransition: Transition = { type: "spring", bounce: 0.25, duration: 0.45, delay: 0 };

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current || isSending) {
      return;
    }

    const formData = new FormData(formRef.current);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("Please fill out all fields.");
      setTimeout(() => setStatus(""), 2500);
      return;
    }

    setIsSending(true);
    setStatus("Sending...");

    try {
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus(data?.error ?? "Failed to send message.");
        return;
      }

      setStatus("Message sent.");
      formRef.current.reset();
    } catch (error) {
      setStatus("Failed to send message.");
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus(""), 2500);
    }
  };

  const handleTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-grid">
        <label className="sr-only" htmlFor="name">
          Name
        </label>
        <input className="input" id="name" name="name" placeholder="Name" type="text" />
        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input className="input" id="email" name="email" placeholder="Email" type="email" />
      </div>
      <label className="sr-only" htmlFor="message">
        Message
      </label>
      <textarea
        className="textarea"
        id="message"
        name="message"
        placeholder="Message"
        onKeyDown={handleTextareaKeyDown}
      />
      <div className="contact-actions">
        <motion.button
          className="button"
          type="submit"
          disabled={isSending}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={buttonTransition}
        >
          {isSending ? "Sending..." : "Send message"}
        </motion.button>
        <span className="helper">or {"\u21b5"} Enter to send</span>
      </div>
      {status ? <span className="helper">{status}</span> : null}
    </form>
  );
}
