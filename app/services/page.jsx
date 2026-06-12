"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import { SERVICES } from "@/lib/business";

export default function Services() {
  return (
    <>
      <Nav authed={false} />
      <main className="container fade" style={{ paddingTop: 28, paddingBottom: 56 }}>
        <span className="eyebrow">What we do</span>
        <h1 className="h1" style={{ fontSize: "clamp(28px,5vw,40px)" }}>Available services</h1>
        <p className="lead" style={{ maxWidth: 620 }}>
          Every small business needs a steady stream of content — but not the cost of an agency.
          VividForge consolidates the whole content workflow into one tool, so you brief once and
          get publish-ready media in minutes.
        </p>

        <section className="grid grid-3" style={{ marginTop: 26 }}>
          {SERVICES.map((s) => (
            <div className="card" key={s.title}>
              <div className="spark" style={{ background: "#ECEEF7", color: "#12173A", fontSize: 20 }}>{s.icon}</div>
              <h2 className="h2" style={{ fontSize: 18, marginTop: 12 }}>{s.title}</h2>
              <p className="muted" style={{ margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </section>

        <section className="card card-pad" style={{ marginTop: 26, background: "var(--navy)", color: "#fff", border: "none" }}>
          <div className="grid grid-2" style={{ alignItems: "center" }}>
            <div>
              <span className="eyebrow" style={{ color: "#FF8A97" }}>Why it works</span>
              <h2 className="h2" style={{ color: "#fff", fontSize: 24 }}>One tool instead of five</h2>
              <p style={{ color: "#C8CCEA" }}>
                No more juggling a designer, a copywriter, a video editor and three apps. VividForge
                folds them into a single subscription — saving you time and money on every campaign.
              </p>
            </div>
            <div className="row" style={{ justifyContent: "flex-end" }}>
              <Link href="/pricing" className="btn btn-primary">See pricing</Link>
              <Link href="/login" className="btn btn-ghost" style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}>Try it free</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
