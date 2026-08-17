import Image from "next/image";
import Link from "next/link";
import SignUpForm from "@/components/auth/SignUpForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata = { title: "Create Account — JasonPro Solutions" };

export default function SignUpPage() {
  return <main className="auth-page"><section className="auth-visual"><Link href="/"><Image src="/assets/jasonpro-logo-light.png" alt="JasonPro Solutions" width={180} height={97}/></Link><div><span>CLIENT / MEMBER ACCESS</span><h1>ONE ACCOUNT.<br/>YOUR DIGITAL WORKSPACE.</h1><p>Create secure access for purchases, premium services and future client collaboration. Access remains governed by role-based permissions and database RLS.</p></div></section><section className="auth-form-shell"><div><SignUpForm configured={isSupabaseConfigured}/><Link href="/auth/sign-in" className="auth-help">Already have an account? Sign in →</Link></div></section></main>;
}
