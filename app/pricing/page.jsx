"use client";
import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";

const PLANS = [
  { id: "starter", name: "Starter", price: 0, period: "free", tagline: "Try the core workflow",
    features: ["10 AI drafts / month", "Captions & hashtags", "1 brand kit"], cta: "Start free", highlight: false },
  { id: "studio", name: "Studio", price: 29, period: "/mo", tagline: "For active small businesses",
    features: ["Unlimited AI drafts", "Captions, copy, video scripts", "3 brand kits", "Priority generation"], cta: "Choose Studio", highlight: true },
  { id: "growth", name: "Growth", price: 79, period: "/mo", tagline: "Add human creator polish",
    features: ["Everything in Studio", "Vetted human creator handoff", "Team seats", "Brand support"], cta: "Choose Growth", highlight: false },
];

export default function Pricing() {
  const [checkout, setCheckout] = useState(null); // selected plan
  const [stage, setStage] = useState("select");   // select | pay | processing | done
  const [ref, setRef] = useState("");

  function choose(plan) {
    if (plan.price === 0) { window.location.href = "/login"; return; }
    setCheckout(plan); setStage("pay");
  }

  function pay() {
    setStage("processing");
    setTimeout(() => {
      const r = "VF-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      setRef(r);
      try { localStorage.setItem("vf_subscription", JSON.stringify({ plan: checkout.id, ref: r, date: Date.now() })); } catch {}
      setStage("done");
    }, 1600);
  }

  function close() { setCheckout(null); setStage("select"); }

  return (
    <>
      <Nav authed={false} />
      <main className="container fade" style={{ paddingTop: 28, paddingBottom: 56 }}>
        <div className="center">
          <span className="eyebrow">Pricing</span>
          <h1 className="h1" style={{ fontSize: "clamp(28px,5vw,40px)" }}>Simple plans, no agency invoices</h1>
          <p className="lead" style={{ maxWidth: 560, margin: "0 auto" }}>Flat monthly pricing so you always know what content costs.</p>
        </div>

        <section className="grid grid-3" style={{ marginTop: 28, alignItems: "stretch" }}>
          {PLANS.map((p) => (
            <div key={p.id} className={`card price-card ${p.highlight ? "price-pop" : ""}`}>
              {p.highlight && <div className="ribbon">Most popular</div>}
              <h2 className="h2" style={{ fontSize: 20 }}>{p.name}</h2>
              <p className="muted" style={{ marginTop: 0 }}>{p.tagline}</p>
              <div className="price">
                <span className="price-num">{p.price === 0 ? "Free" : `$${p.price}`}</span>
                {p.price !== 0 && <span className="price-per">{p.period} AUD</span>}
              </div>
              <ul className="ticks">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <button className={`btn ${p.highlight ? "btn-primary" : "btn-ghost"} btn-block`} onClick={() => choose(p)}>{p.cta}</button>
            </div>
          ))}
        </section>

        <p className="center muted" style={{ marginTop: 20, fontSize: 13 }}>
          💡 Payments here are <strong>simulated</strong> for this class assignment — no real money is charged.
        </p>
      </main>

      {checkout && (
        <div className="modal-overlay" onClick={stage === "processing" ? undefined : close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {stage === "pay" && (
              <>
                <h2 className="h2" style={{ fontSize: 20 }}>Checkout</h2>
                <div className="order">
                  <span>{checkout.name} plan</span>
                  <strong>${checkout.price}.00 {checkout.period} AUD</strong>
                </div>
                <div className="divider" />
                <button className="paypal-btn" onClick={pay}>
                  <span className="pp"><i>Pay</i><b>Pal</b></span> Checkout
                </button>
                <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }} onClick={close}>Cancel</button>
                <p className="muted center" style={{ fontSize: 12, marginTop: 12 }}>
                  Simulated payment — for a class assignment, not commercial use. No card or PayPal account needed.
                </p>
              </>
            )}
            {stage === "processing" && (
              <div className="center" style={{ padding: "24px 0" }}>
                <div className="spin" style={{ borderTopColor: "#FF5B6E", borderColor: "#FFD7DD", margin: "0 auto 14px", width: 30, height: 30 }} />
                <p className="muted">Processing your simulated payment…</p>
              </div>
            )}
            {stage === "done" && (
              <div className="center fade">
                <div className="spark" style={{ background: "#E9FBF7", color: "#0E8F7E", margin: "0 auto 12px", width: 50, height: 50, fontSize: 26 }}>✓</div>
                <h2 className="h2" style={{ fontSize: 20 }}>Payment successful</h2>
                <p className="muted">Your <strong>{checkout.name}</strong> plan is active (demo).<br />Reference: <strong>{ref}</strong></p>
                <Link href="/login" className="btn btn-primary btn-block" style={{ marginTop: 10 }}>Go to the app</Link>
                <button className="btn btn-ghost btn-block" style={{ marginTop: 8 }} onClick={close}>Back to pricing</button>
                <p className="muted center" style={{ fontSize: 12, marginTop: 12 }}>This is a simulated transaction for a class assignment.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
