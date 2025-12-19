"use client";

import { motion, type Transition } from "framer-motion";
import { useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";

const buttonTransition: Transition = { type: "spring", bounce: 0.25, duration: 0.45, delay: 0 };

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Message ready to send.");
    setTimeout(() => setStatus(""), 2000);
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={buttonTransition}
        >
          Send message
        </motion.button>
        <span className="helper">or {"\u21b5"} Enter to send</span>
      </div>
      {status ? <span className="helper">{status}</span> : null}
    </form>
  );
}
