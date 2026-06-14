"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { Icon } from "@/lib/icons";
import { getUser, getProjects, getSchedule } from "@/lib/store";

export default function Analytics() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [created, setCreated] = useState(0);
  const [scheduled, setScheduled] = useState(0);

  useEffect(() => {
    if (!getUser()) { router.replace("/login"); return; }
    setCreated(getProjects().length);
    setScheduled(getSchedule().length);
    setReady(true);
  }, [router]);

  if (!ready) return <><Nav /><main className="container" style={{ padding: 40 }} /></>;

  // demo numbers (illustrative)
  const reach = 12480, engagement = 6.4;
  const byPlatform = [
    { name: "Instagram", val: 78, color: "#FF5B6E" },
    { name: "TikTok", val: 92, color: "#27C4B0" },
    { name: "LinkedIn", val: 41, color: "#3D5AF0" },
    { name: "Facebook", val: 33, color: "#9AA0C4" },
  ];

  const stats = [
    { ic: "captions", label: "Drafts created", value: created, tint: ["#FFEFF1", "#FF5B6E"] },
    { ic: "calendar", label: "Posts scheduled", value: scheduled, tint: ["#E9FBF7", "#0E8F7E"] },
    { ic: "analytics", label: "Reach (30 days)", value: reach.toLocaleString(), tint: ["#ECEEF7", "#12173A"] },
    { ic: "magic", label: "Avg. engagement", value: engagement + "%", tint: ["#EFF3FF", "#3D5AF0"] },
  ];

  return (
    <>
      <Nav />
      <main className="container shell fade" style={{ paddingTop: 28, paddingBottom: 60 }}>
        <span className="eyebrow">Performance</span>
        <h1 className="h2" style={{ fontSize: 28, marginTop: 6 }}>Analytics</h1>

        <div className="note-band">
          <Icon name="analytics" /> Demo data shown below. Connect your social accounts to see real reach and engagement. <span className="pill pill-soon">Roadmap</span>
        </div>

        <div className="grid grid-2" style={{ marginTop: 16 }}>
          {stats.map((s) => (
            <div className="card tile" key={s.label}>
              <span className="tile-ic" style={{ background: s.tint[0], color: s.tint[1] }}><Icon name={s.ic} /></span>
              <div><strong style={{ fontSize: 22 }}>{s.value}</strong><p className="muted" style={{ margin: 0 }}>{s.label}</p></div>
            </div>
          ))}
        </div>

        <div className="card card-pad" style={{ marginTop: 16 }}>
          <h2 className="h2" style={{ fontSize: 18 }}>Engagement by platform</h2>
          <p className="muted" style={{ marginTop: 0, fontSize: 13 }}>Illustrative — relative engagement index.</p>
          <div className="barchart">
            {byPlatform.map((b) => (
              <div className="bar-row" key={b.name}>
                <span className="bar-label">{b.name}</span>
                <span className="bar-track"><span className="bar-fill" style={{ width: `${b.val}%`, background: b.color }} /></span>
                <span className="bar-val">{b.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad" style={{ marginTop: 16, background: "var(--navy)", color: "#fff", border: "none" }}>
          <span className="eyebrow" style={{ color: "#FF8A97" }}>Why this matters</span>
          <h2 className="h2" style={{ color: "#fff", fontSize: 20 }}>The AI learns what works</h2>
          <p style={{ color: "#C8CCEA", margin: "0 0 14px" }}>
            With analytics connected, VividForge spots your best-performing tone, format and posting time — then bakes that into the next round of drafts. Your results compound the longer you use it.
          </p>
          <Link href="/brief" className="btn btn-primary">Generate your next post</Link>
        </div>
      </main>
    </>
  );
}
