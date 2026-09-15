"use client";

import { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/actions/auth";

export default function RegisterPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const result = await registerUser(form);
    setMessage(result.success ? "Account created. Please sign in." : result.message || "Registration failed.");
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-md px-6 lg:px-8">
        <h1 className="mb-2 text-center font-display text-4xl font-light">Create Account</h1>
        <p className="mb-10 text-center text-stone">Join Aurent to track orders and save your wishlist.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="name" required placeholder="Full Name" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none placeholder:text-stone focus:border-brass" />
          <input name="email" type="email" required placeholder="Email" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none placeholder:text-stone focus:border-brass" />
          <input name="password" type="password" required placeholder="Password" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none placeholder:text-stone focus:border-brass" />
          <input name="confirmPassword" type="password" required placeholder="Confirm Password" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none placeholder:text-stone focus:border-brass" />
          {message && <p className="text-sm text-stone">{message}</p>}
          <button type="submit" className="w-full bg-ink py-4 text-xs font-semibold uppercase tracking-widest text-cream transition hover:bg-brass">Create Account</button>
        </form>
        <p className="mt-8 text-center text-sm text-stone">Already have an account? <Link href="/login" className="hover:text-brass">Sign in</Link></p>
      </div>
    </section>
  );
}
