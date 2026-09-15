"use client";

import { useState } from "react";

export default function ResetPasswordPage() {
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Your password has been updated.");
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-md px-6 lg:px-8">
        <h1 className="mb-2 text-center font-display text-4xl font-light">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="password" type="password" required placeholder="New Password" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none placeholder:text-stone focus:border-brass" />
          <input name="confirmPassword" type="password" required placeholder="Confirm New Password" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none placeholder:text-stone focus:border-brass" />
          {message && <p className="text-sm text-stone">{message}</p>}
          <button type="submit" className="w-full bg-ink py-4 text-xs font-semibold uppercase tracking-widest text-cream transition hover:bg-brass">Update Password</button>
        </form>
      </div>
    </section>
  );
}
