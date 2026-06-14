"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { getUser, saveProject, getBrandKit, uid } from "@/lib/store";
import { Icon } from "@/lib/icons";

const PLATFORMS = ["Instagram", "TikTok", "LinkedIn", "Facebook", "YouTube"];
const TONES = ["Energetic & playful", "Warm & friendly", "Premium & polished", "Bold & direct"];

export default function Brief() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({ businessName: "", industry: "", goal: "", platform: "Instagram", tone: "Energetic & playful" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getUser()) { router.replace("/login"); return; }
    const kit = getBrandKit();
    setForm((f) => ({ ...f, businessName: kit.name || "", tone: kit.tone || f.tone }));
    setReady(true);
  }, [router]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function generate(e) {
    e.preventDefault();
    setError("");
    if (!form.industry.trim() || !form.goal.trim()) {
      setError("Add your industry and campaign goal so the AI has something to work with.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      const project = { id: uid(), ...form, result: data.result, created: Date.now() };
      saveProject(project);
      router.push(`/result/${project.id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  if (!ready) return <><Nav /><main className="container" style={{ padding: 40 }} /></>;

  return (
    <>
      <Nav />
      <main className="container shell fade" style={{ paddingTop: 28, paddingBottom: 60 }}>
        <span className="eyebrow">New brief</span>
        <h1 className="h2" style={{ fontSize: 28, marginTop: 6 }}>Tell us about the campaign</h1>
        <p className="muted" style={{ marginTop: 0 }}>VividForge drafts a headline, caption, hashtags, and a short video script.</p>

        <form onSubmit={generate} className="card card-pad" style={{ marginTop: 18 }}>
          <div className="field">
            <label className="label">Business name</label>
            <input className="input" value={form.businessName} onChange={set("businessName")} placeholder="Bondi Bowls Café" />
          </div>
          <div className="field">
            <label className="label">Industry *</label>
            <input className="input" value={form.industry} onChange={set("industry")} placeholder="Healthy café / brunch spot" />
          </div>
          <div className="field">
            <label className="label">Campaign goal *</label>
            <textarea className="textarea" value={form.goal} onChange={set("goal")} placeholder="Promote our new winter smoothie range and drive weekday foot traffic." />
          </div>

          <div className="field">
            <label className="label">Platform</label>
            <div className="chips">
              {PLATFORMS.map((p) => (
                <button type="button" key={p} className={`chip ${form.platform === p ? "on" : ""}`} onClick={() => setForm({ ...form, platform: p })}>{p}</button>
              ))}
            </div>
          </div>

          <div className="field">
            <label className="label">Brand tone</label>
            <div className="chips">
              {TONES.map((t) => (
                <button type="button" key={t} className={`chip ${form.tone === t ? "on" : ""}`} onClick={() => setForm({ ...form, tone: t })}>{t}</button>
              ))}
            </div>
          </div>

          {error && <p style={{ color: "#C00", fontSize: 14, marginTop: 4 }}>{error}</p>}

          <button className="btn btn-primary btn-block" disabled={loading} style={{ marginTop: 6 }}>
            {loading ? <><span className="spin" /> Drafting your media…</> : <><Icon name="magic" /> Generate media</>}
          </button>
        </form>
      </main>
    </>
  );
}
