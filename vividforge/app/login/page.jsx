"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { setUser } from "@/lib/store";

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function signIn(e) {
    e.preventDefault();
    setUser({ name: name.trim() || "Founder", email: email.trim(), since: Date.now() });
    router.push("/dashboard");
  }

  return (
    <>
      <Nav authed={false} />
      <main className="container shell" style={{ paddingTop: 48, paddingBottom: 60 }}>
        <div className="card card-pad fade" style={{ maxWidth: 440, margin: "0 auto" }}>
          <span className="eyebrow">Welcome</span>
          <h1 className="h2" style={{ fontSize: 26, marginTop: 6 }}>Sign in to VividForge</h1>
          <p className="muted" style={{ marginTop: 0 }}>This demo signs you in instantly — no password needed.</p>
          <form onSubmit={signIn} style={{ marginTop: 18 }}>
            <div className="field">
              <label className="label" htmlFor="n">Your name</label>
              <input id="n" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Founder" />
            </div>
            <div className="field">
              <label className="label" htmlFor="e">Email</label>
              <input id="e" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@business.com.au" />
            </div>
            <button className="btn btn-primary btn-block" type="submit">Continue</button>
          </form>
          <p className="muted" style={{ fontSize: 12, marginTop: 14, marginBottom: 0 }}>
            Demo auth stores your name locally. Connect Supabase for real accounts.
          </p>
        </div>
      </main>
    </>
  );
}
