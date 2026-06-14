"use client";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Icon } from "@/lib/icons";
import { SERVICES, ROADMAP } from "@/lib/business";

export default function Home() {
  return (
    <>
      <Nav authed={false} />
      <main className="container" style={{ paddingTop: 28, paddingBottom: 56 }}>
        {/* HERO */}
        <section className="hero fade">
          <div className="blob" style={{ width: 260, height: 260, background: "#FF5B6E", top: -90, right: -60 }} />
          <div className="blob" style={{ width: 200, height: 200, background: "#27C4B0", bottom: -80, right: 120 }} />
          <div style={{ position: "relative", maxWidth: 660 }}>
            <span className="eyebrow" style={{ color: "#FF8A97" }}>Digital media services for business</span>
            <h1 className="h1">Every business has a story. Most have <span style={{ color: "#FF5B6E" }}>no time</span> to tell it.</h1>
            <p className="lead">VividForge turns a quick brief into agency-quality posts, captions, and video scripts — then helps you schedule and publish them. One tool, one flat price.</p>
            <div className="row" style={{ marginTop: 22 }}>
              <Link href="/login" className="btn btn-primary">Start creating free</Link>
              <Link href="/pricing" className="btn btn-ghost" style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}>See pricing</Link>
            </div>
          </div>
        </section>

        {/* VALUE PILLARS */}
        <section className="grid grid-3" style={{ marginTop: 28 }}>
          {[
            ["speed", "Built for speed", "Brief in, first draft out in under a minute."],
            ["price", "Predictable price", "One flat subscription — no agency surprises."],
            ["brand", "Always on-brand", "Reuse your colours, tone, and tagline every time."],
          ].map(([ic, t, d]) => (
            <div className="card" key={t}>
              <div className="spark" style={{ background: "#ffffff", color: "#12173A", fontSize: 18 }}><Icon name={ic} /></div>
              <h2 className="h2" style={{ fontSize: 18, marginTop: 12 }}>{t}</h2>
              <p className="muted" style={{ margin: 0 }}>{d}</p>
            </div>
          ))}
        </section>

        {/* HOW IT WORKS */}
        <section className="card card-pad" style={{ marginTop: 28 }}>
          <span className="eyebrow">How it works</span>
          <h2 className="h2" style={{ fontSize: 24 }}>From idea to published post</h2>
          <div className="grid grid-3" style={{ marginTop: 14 }}>
            {[
              ["1", "Brief it", "Tell us your business, goal, platform and tone."],
              ["2", "Generate", "AI drafts a headline, caption, hashtags and a video script."],
              ["3", "Schedule & publish", "Drop it on your calendar and post — or send to a creator."],
            ].map(([n, t, d]) => (
              <div key={n} className="step">
                <span className="step-num">{n}</span>
                <div><strong>{t}</strong><p className="muted" style={{ margin: "2px 0 0" }}>{d}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section style={{ marginTop: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
            <div>
              <span className="eyebrow">What you get</span>
              <h2 className="h2" style={{ fontSize: 24 }}>Everything you need to stay posting</h2>
            </div>
            <Link href="/services" className="muted" style={{ fontWeight: 700 }}>All services →</Link>
          </div>
          <div className="grid grid-3" style={{ marginTop: 14 }}>
            {SERVICES.map((s) => (
              <div className="card" key={s.title}>
                <div className="spark" style={{ background: "#ffffff", color: "#E84A5D", fontSize: 16 }}><Icon name={s.icon} /></div>
                <h3 style={{ margin: "10px 0 4px", fontSize: 16, color: "var(--navy)" }}>{s.title}</h3>
                <p className="muted" style={{ margin: 0, fontSize: 14 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ROADMAP — more than a generator */}
        <section style={{ marginTop: 32 }}>
          <span className="eyebrow">More than a generator</span>
          <h2 className="h2" style={{ fontSize: 24 }}>A studio that grows with you</h2>
          <div className="grid grid-3" style={{ marginTop: 14 }}>
            {ROADMAP.slice(0, 3).map((s) => (
              <div className="card" key={s.title}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="spark" style={{ background: "#FFF4E8", color: "#C77700", fontSize: 16 }}><Icon name={s.icon} /></div>
                  <span className="pill pill-soon">{s.tag}</span>
                </div>
                <h3 style={{ margin: "10px 0 4px", fontSize: 16, color: "var(--navy)" }}>{s.title}</h3>
                <p className="muted" style={{ margin: 0, fontSize: 14 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* social proof */}
        <section className="grid grid-3" style={{ marginTop: 28 }}>
          {[
            ["“We post twice as often and it barely takes me ten minutes a week.”", "— Bondi Bowls Café"],
            ["“It replaced three freelancers we used to chase every month.”", "— Northside Pilates"],
            ["“The captions actually sound like our brand. Game changer.”", "— Ferndale Florist"],
          ].map(([q, a]) => (
            <div className="card quote" key={a}>
              <p style={{ margin: 0 }}>{q}</p>
              <span className="muted" style={{ fontSize: 13, fontWeight: 700 }}>{a}</span>
            </div>
          ))}
        </section>

        {/* final CTA */}
        <section className="cta-band" style={{ marginTop: 32 }}>
          <div>
            <h2 className="h2" style={{ color: "#fff", fontSize: 26 }}>Ready to forge your next campaign?</h2>
            <p style={{ color: "#C8CCEA", margin: 0 }}>Start free — upgrade only when you’re ready.</p>
          </div>
          <div className="row">
            <Link href="/login" className="btn btn-primary">Start free</Link>
            <Link href="/contact" className="btn btn-ghost" style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}>Contact us</Link>
          </div>
        </section>
      </main>
    </>
  );
}
