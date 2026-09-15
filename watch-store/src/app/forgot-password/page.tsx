"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("If this email exists in our records, you will receive reset instructions.");
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-md px-6 lg:px-8">
        <h1 className="mb-2 text-center font-display text-4xl font-light">Forgot Password</h1>
        <p className="mb-10 text-center text-stone">Enter your email and we will send you a reset link.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="email" type="email" required placeholder="Email" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none placeholder:text-stone focus:border-brass" />
          {message && <p className="text-sm text-stone">{message}</p>}
          <button type="submit" className="w-full bg-ink py-4 text-xs font-semibold uppercase tracking-widest text-cream transition hover:bg-brass">Send Reset Link</button>
        </form>
      </div>
    </section>
  );
}
