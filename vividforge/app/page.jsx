"use client";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <>
      <Nav authed={false} />
      <main className="container" style={{ paddingTop: 28, paddingBottom: 60 }}>
        <section className="hero fade">
          <div className="blob" style={{ width: 260, height: 260, background: "#FF5B6E", top: -90, right: -60 }} />
          <div className="blob" style={{ width: 200, height: 200, background: "#27C4B0", bottom: -80, right: 120 }} />
          <div style={{ position: "relative", maxWidth: 640 }}>
            <span className="eyebrow" style={{ color: "#FF8A97" }}>Digital media services for business</span>
            <h1 className="h1">Every business has a story. Most have <span style={{ color: "#FF5B6E" }}>no time</span> to tell it.</h1>
            <p className="lead">VividForge turns a quick brief into agency-quality social posts, captions, and video scripts — in minutes, not weeks.</p>
            <div className="row" style={{ marginTop: 22 }}>
              <Link href="/login" className="btn btn-primary">Start creating</Link>
              <Link href="/login" className="btn btn-ghost" style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}>See the dashboard</Link>
            </div>
          </div>
        </section>

        <section className="grid grid-3" style={{ marginTop: 28 }}>
          {[
            ["⚡", "Built for speed", "Brief in, first draft out in under a minute."],
            ["💸", "Predictable price", "One flat subscription — no agency surprises."],
            ["🎨", "Always on-brand", "Reuse your colours, tone, and tagline every time."],
          ].map(([ic, t, d]) => (
            <div className="card" key={t}>
              <div className="spark" style={{ background: "#ECEEF7", color: "#12173A", fontSize: 18 }}>{ic}</div>
              <h2 className="h2" style={{ fontSize: 18, marginTop: 12 }}>{t}</h2>
              <p className="muted" style={{ margin: 0 }}>{d}</p>
            </div>
          ))}
        </section>

        <p className="center muted" style={{ marginTop: 40, fontSize: 13 }}>
          Demo MVP · built with Next.js on Vercel · installable as a mobile app
        </p>
      </main>
    </>
  );
}
