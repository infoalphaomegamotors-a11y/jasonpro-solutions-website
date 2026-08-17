"use client";

import { useActionState } from "react";
import { signUpAction } from "@/app/auth/actions";

export default function SignUpForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState(signUpAction, {});
  return <form className="auth-form" action={action}>
    <small>CREATE SECURE ACCESS</small>
    <h2>Create account.</h2>
    <label>Full name<input type="text" name="full_name" autoComplete="name" placeholder="Your full name" required disabled={!configured}/></label>
    <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@company.com" required disabled={!configured}/></label>
    <label>Password<input type="password" name="password" autoComplete="new-password" minLength={8} placeholder="At least 8 characters" required disabled={!configured}/></label>
    <button disabled={!configured || pending}>{pending ? "CREATING ACCOUNT…" : "CREATE ACCOUNT →"}</button>
    {state?.error && <p className="auth-error" role="alert">{state.error}</p>}
    {state?.success && <p className="auth-success" role="status">{state.success}</p>}
  </form>;
}
