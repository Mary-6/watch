"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/actions/newsletter";

interface NewsletterFormProps {
  variant?: "default" | "footer";
}

export function NewsletterForm({ variant = "default" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const result = await subscribeNewsletter(email);
    setLoading(false);
    setMessage(result.message);
    if (result.success) setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className={variant === "footer" ? "flex flex-col gap-3" : "mx-auto max-w-md"}>
      {variant !== "footer" && (
        <h3 className="mb-4 font-display text-2xl font-light">Join the Aurent Journal</h3>
      )}
      <div className="flex items-center border-b border-ink/20 focus-within:border-brass">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-stone"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-widest text-ink hover:text-brass disabled:opacity-50"
        >
          {loading ? "..." : "Subscribe"}
        </button>
      </div>
      {message && <p className="mt-2 text-xs text-stone">{message}</p>}
    </form>
  );
}
