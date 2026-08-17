"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInAction } from "@/app/auth/actions";

export default function SignInForm({ next = "/portal", configured }: { next?: string; configured: boolean }) {
  const [state, action, pending] = useActionState(signInAction, {});
  return <form className="auth-form" action={action}>
    <small>{configured ? "SECURE CLIENT / MEMBER ACCESS" : "AUTHENTICATION FOUNDATION"}</small>
    <h2>Sign in.</h2>
    <input type="hidden" name="next" value={next}/>
    <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@company.com" required disabled={!configured}/></label>
    <label>Password<input type="password" name="password" autoComplete="current-password" placeholder="••••••••" required disabled={!configured}/></label>
    <div style={{display:"flex",justifyContent:"flex-end",marginTop:"-10px",marginBottom:"16px"}}><Link href="/auth/forgot-password" className="auth-help">Forgot password?</Link></div>
    <button disabled={!configured || pending}>{pending ? "SIGNING IN…" : "SIGN IN →"}</button>
    {state?.error && <p className="auth-error" role="alert">{state.error}</p>}
    {!configured && <p>Sign-in is temporarily unavailable while authentication configuration is being completed.</p>}
  </form>;
}
