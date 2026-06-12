"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/store";

export default function Nav({ authed = true }) {
  const path = usePathname();
  const router = useRouter();
  const is = (p) => (path === p ? "active" : "");

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href={authed ? "/dashboard" : "/"} className="brand">
          <span className="spark">⚡</span> VividForge
        </Link>
        {authed ? (
          <nav className="nav-links">
            <Link href="/dashboard" className={is("/dashboard")}>Projects</Link>
            <Link href="/brief" className={is("/brief")}>New brief</Link>
            <Link href="/brand-kit" className={is("/brand-kit")}>Brand kit</Link>
            <Link href="/pricing" className={is("/pricing")}>Upgrade</Link>
            <button
              className="btn btn-ghost"
              style={{ padding: "8px 14px" }}
              onClick={() => { logout(); router.push("/login"); }}
            >
              Sign out
            </button>
          </nav>
        ) : (
          <nav className="nav-links">
            <Link href="/services" className={is("/services")}>Services</Link>
            <Link href="/pricing" className={is("/pricing")}>Pricing</Link>
            <Link href="/contact" className={is("/contact")}>Contact</Link>
            <Link href="/login" className="btn btn-primary" style={{ padding: "9px 16px" }}>Sign in</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
