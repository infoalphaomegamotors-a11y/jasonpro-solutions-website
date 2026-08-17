import Image from "next/image";
import Link from "next/link";
import SignInForm from "@/components/auth/SignInForm";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata = { title: "Sign In — JasonPro Solutions" };

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const params = await searchParams;
  return <main className="auth-page"><section className="auth-visual"><Link href="/"><Image src="/assets/jasonpro-logo-light.png" alt="JasonPro Solutions" width={180} height={97}/></Link><div><span>CLIENT / MEMBER ACCESS</span><h1>YOUR WORK.<br/>ONE SECURE SPACE.</h1><p>Projects, deliverables, approvals, invoices and premium access live behind authenticated, role-based access.</p></div></section><section className="auth-form-shell"><div><SignInForm next={params.next ?? "/portal"} configured={isSupabaseConfigured}/><Link href="/auth/forgot-password" className="auth-help">Forgot your password? →</Link><Link href="/auth/sign-up" className="auth-help">Create an account →</Link><Link href="/contact" className="auth-help">Need help? Contact JasonPro →</Link></div></section></main>;
}
