"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });
    if (res?.error) setError(res.error);
    else router.push("/account");
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-md px-6 lg:px-8">
        <h1 className="mb-2 text-center font-display text-4xl font-light">Sign In</h1>
        <p className="mb-10 text-center text-stone">Welcome back to Aurent.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div><input name="email" type="email" required placeholder="Email" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none placeholder:text-stone focus:border-brass" /></div>
          <div><input name="password" type="password" required placeholder="Password" className="w-full border-b border-ink/10 bg-transparent py-3 outline-none placeholder:text-stone focus:border-brass" /></div>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button type="submit" className="w-full bg-ink py-4 text-xs font-semibold uppercase tracking-widest text-cream transition hover:bg-brass">Sign In</button>
        </form>
        <div className="mt-8 text-center text-sm text-stone">
          <Link href="/forgot-password" className="hover:text-brass">Forgot password?</Link>
          <span className="mx-2">·</span>
          <Link href="/register" className="hover:text-brass">Create an account</Link>
        </div>
      </div>
    </section>
  );
}
