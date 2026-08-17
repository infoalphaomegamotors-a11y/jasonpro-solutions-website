import Link from "next/link";
import { UpdatePasswordForm } from "@/components/auth/PasswordRecoveryForms";

export default function UpdatePasswordPage() {
  return <main className="auth-page"><section className="auth-shell"><div className="auth-copy"><span>SECURE ACCOUNT</span><h1>SET A NEW PASSWORD.</h1><p>Use a strong password you do not reuse elsewhere. This screen only works with a valid recovery or signed-in session.</p><Link href="/">BACK TO SITE</Link></div><div className="auth-card"><span>PASSWORD SECURITY</span><h2>Update password</h2><UpdatePasswordForm /></div></section></main>;
}
