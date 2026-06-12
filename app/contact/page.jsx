"use client";
import { useState } from "react";
import Nav from "@/components/Nav";
import { BUSINESS, SOCIALS } from "@/lib/business";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  function submit(e) {
    e.preventDefault();
    setSent(true); // demo only — no message is actually sent
  }

  return (
    <>
      <Nav authed={false} />
      <main className="container fade" style={{ paddingTop: 28, paddingBottom: 56 }}>
        <span className="eyebrow">Get in touch</span>
        <h1 className="h1" style={{ fontSize: "clamp(28px,5vw,40px)" }}>Contact us</h1>
        <p className="lead" style={{ maxWidth: 560 }}>Questions about VividForge? Send us a note and we’ll get back to you.</p>

        <div className="grid grid-2" style={{ marginTop: 24, alignItems: "start" }}>
          {/* form */}
          <div className="card card-pad">
            {sent ? (
              <div className="center fade" style={{ padding: "20px 0" }}>
                <div className="spark" style={{ background: "#E9FBF7", color: "#0E8F7E", margin: "0 auto 12px", width: 50, height: 50, fontSize: 26 }}>✓</div>
                <h2 className="h2" style={{ fontSize: 20 }}>Thanks, {form.name || "there"}!</h2>
                <p className="muted">Your message has been received (demo). We’ll reply to {form.email || "your email"} soon.</p>
                <button className="btn btn-ghost" onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}>Send another</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="field">
                  <label className="label">Name</label>
                  <input className="input" value={form.name} onChange={set("name")} required placeholder="Your name" />
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <input className="input" type="email" value={form.email} onChange={set("email")} required placeholder="you@business.com.au" />
                </div>
                <div className="field">
                  <label className="label">Message</label>
                  <textarea className="textarea" value={form.message} onChange={set("message")} required placeholder="How can we help?" />
                </div>
                <button className="btn btn-primary btn-block" type="submit">Send message</button>
                <p className="muted" style={{ fontSize: 12, marginTop: 10 }}>Demo form — submissions are not stored or sent (class assignment).</p>
              </form>
            )}
          </div>

          {/* details + map */}
          <div>
            <div className="card card-pad" style={{ marginBottom: 16 }}>
              <h2 className="h2" style={{ fontSize: 18 }}>{BUSINESS.name}</h2>
              <p className="footer-line" style={{ color: "var(--ink)" }}>📍 {BUSINESS.address}</p>
              <p className="footer-line" style={{ color: "var(--ink)" }}>✉️ <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></p>
              <p className="footer-line" style={{ color: "var(--ink)" }}>📞 {BUSINESS.phone}</p>
              <div className="divider" />
              <p className="footer-line" style={{ color: "var(--mute)" }}>ABN: {BUSINESS.abn} <span className="temp">(temporary)</span></p>
              <p className="footer-line" style={{ color: "var(--mute)" }}>ACN: {BUSINESS.acn} <span className="temp">(temporary)</span></p>
              <div className="socials" style={{ marginTop: 12 }}>
                {SOCIALS.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" title={s.name} style={{ background: "#ECEEF7" }}>{s.icon}</a>
                ))}
              </div>
            </div>
            <div className="map-wrap">
              <iframe
                title="VividForge location"
                src={mapSrc}
                width="100%"
                height="260"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
