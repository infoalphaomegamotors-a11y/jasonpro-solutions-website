import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/PasswordRecoveryForms";

export default function ForgotPasswordPage() {
  return <main className="auth-page"><section className="auth-shell"><div className="auth-copy"><span>ACCOUNT RECOVERY</span><h1>RESET YOUR PASSWORD.</h1><p>Enter the email address linked to your JasonPro account. We will send a secure recovery link if the account exists.</p><Link href="/">BACK TO SITE</Link></div><div className="auth-card"><span>SECURE RECOVERY</span><h2>Forgot password</h2><ForgotPasswordForm /></div></section></main>;
}
