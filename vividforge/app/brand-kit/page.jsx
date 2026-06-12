"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { getUser, getBrandKit, setBrandKit } from "@/lib/store";

export default function BrandKit() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [kit, setKit] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!getUser()) { router.replace("/login"); return; }
    setKit(getBrandKit());
    setReady(true);
  }, [router]);

  function save(e) {
    e.preventDefault();
    setBrandKit(kit);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }
  function setColor(i, val) {
    const colors = [...kit.colors];
    colors[i] = val;
    setKit({ ...kit, colors });
  }

  if (!ready) return <><Nav /><main className="container" style={{ padding: 40 }} /></>;

  return (
    <>
      <Nav />
      <main className="container shell fade" style={{ paddingTop: 28, paddingBottom: 60 }}>
        <span className="eyebrow">Brand kit</span>
        <h1 className="h2" style={{ fontSize: 28, marginTop: 6 }}>Your brand, reused everywhere</h1>
        <p className="muted" style={{ marginTop: 0 }}>Saved here, your name and tone pre-fill every new brief.</p>

        <form onSubmit={save} className="card card-pad" style={{ marginTop: 18 }}>
          <div className="field">
            <label className="label">Brand name</label>
            <input className="input" value={kit.name} onChange={(e) => setKit({ ...kit, name: e.target.value })} />
          </div>
          <div className="field">
            <label className="label">Tagline</label>
            <input className="input" value={kit.tagline} onChange={(e) => setKit({ ...kit, tagline: e.target.value })} />
          </div>
          <div className="field">
            <label className="label">Default tone</label>
            <input className="input" value={kit.tone} onChange={(e) => setKit({ ...kit, tone: e.target.value })} />
          </div>

          <div className="field">
            <label className="label">Brand colours</label>
            <div className="grid grid-3">
              {kit.colors.map((c, i) => (
                <div key={i}>
                  <div className="swatch" style={{ background: c }}>{c.toUpperCase()}</div>
                  <input className="input" style={{ marginTop: 6, padding: "8px 10px", fontSize: 13 }} value={c} onChange={(e) => setColor(i, e.target.value)} />
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" type="submit">{saved ? "Saved ✓" : "Save brand kit"}</button>
        </form>
      </main>
    </>
  );
}
