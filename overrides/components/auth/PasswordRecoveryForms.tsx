"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordResetAction, updatePasswordAction, type AuthState } from "@/app/auth/actions";

const initialState: AuthState = {};

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordResetAction, initialState);
  return <form action={action} className="project-brief-form">
    <label>Email address<input type="email" name="email" required autoComplete="email" placeholder="you@example.com" /></label>
    <button disabled={pending}>{pending ? "SENDING…" : "SEND RESET LINK"}</button>
    {state.error && <p>{state.error}</p>}
    {state.success && <p>{state.success}</p>}
    <p><Link href="/auth/sign-in">Return to sign in</Link></p>
  </form>;
}

export function UpdatePasswordForm() {
  const [state, action, pending] = useActionState(updatePasswordAction, initialState);
  return <form action={action} className="project-brief-form">
    <label>New password<input type="password" name="password" required minLength={8} autoComplete="new-password" /></label>
    <label>Confirm password<input type="password" name="confirm_password" required minLength={8} autoComplete="new-password" /></label>
    <button disabled={pending}>{pending ? "UPDATING…" : "UPDATE PASSWORD"}</button>
    {state.error && <p>{state.error}</p>}
    {state.success && <p>{state.success}</p>}
    {state.success && <p><Link href="/portal">Continue to portal</Link></p>}
  </form>;
}
