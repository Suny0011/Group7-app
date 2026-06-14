"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { Icon } from "@/lib/icons";
import { getUser, getProject, addScheduled, uid } from "@/lib/store";

function Piece({ title, children }) {
  const [copied, setCopied] = useState(false);
  const text = typeof children === "string" ? children : "";
  function copy() {
    if (text && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1400); });
    }
  }
  return (
    <div className="outpiece">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>{title}</h3>
        {text && <button className="copybtn" onClick={copy}>{copied ? "Copied" : "Copy"}</button>}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function Result() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [ready, setReady] = useState(false);
  const [flash, setFlash] = useState("");
  const [scheduling, setScheduling] = useState(false);
  const [when, setWhen] = useState("");

  useEffect(() => {
    if (!getUser()) { router.replace("/login"); return; }
    setProject(getProject(id) || null);
    setReady(true);
  }, [id, router]);

  function toast(msg) { setFlash(msg); setTimeout(() => setFlash(""), 3200); }

  function confirmSchedule() {
    if (!when) return;
    addScheduled({
      id: uid(),
      projectId: project.id,
      businessName: project.businessName,
      platform: project.platform,
      headline: project.result?.headline || project.goal,
      date: new Date(when).toISOString(),
      status: "scheduled",
    });
    setScheduling(false);
    setWhen("");
    toast("Scheduled ✓ — added to your content calendar.");
  }

  if (!ready) return <><Nav /><main className="container" style={{ padding: 40 }} /></>;

  if (!project) {
    return (
      <>
        <Nav />
        <main className="container shell" style={{ paddingTop: 40 }}>
          <div className="card card-pad center">
            <h2 className="h2">We couldn’t find that project</h2>
            <p className="muted">It may have been deleted on this device.</p>
            <Link href="/dashboard" className="btn btn-primary">Back to projects</Link>
          </div>
        </main>
      </>
    );
  }

  const r = project.result || {};
  return (
    <>
      <Nav />
      <main className="container shell fade" style={{ paddingTop: 28, paddingBottom: 60 }}>
        <Link href="/dashboard" className="muted" style={{ fontSize: 14 }}>← Projects</Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
          <div>
            <span className="tag">{project.platform}</span>
            <h1 className="h2" style={{ fontSize: 26, marginTop: 8 }}>{project.businessName || "Your media"}</h1>
            <p className="muted" style={{ margin: 0 }}>{project.goal}</p>
          </div>
          <Link href="/brief" className="btn btn-ghost">Make another</Link>
        </div>

        {flash && <div className="flash">{flash}</div>}

        {/* ACTION BAR */}
        <div className="actions">
          <button className="btn btn-primary" onClick={() => toast(`Published to ${project.platform} (demo) ✓`)}>
            <Icon name="publish" /> Publish now
          </button>
          <button className="btn btn-dark" onClick={() => setScheduling((s) => !s)}>
            <Icon name="calendar" /> Schedule
          </button>
          <button className="btn btn-ghost" onClick={() => toast("Sent to a VividForge creator for polish (demo) ✓")}>
            <Icon name="creator" /> Send to creator
          </button>
          <button className="btn btn-ghost" disabled title="Coming soon">
            <Icon name="image" /> Add image <span className="pill pill-soon">Roadmap</span>
          </button>
        </div>

        {scheduling && (
          <div className="card card-pad fade" style={{ marginTop: 12 }}>
            <label className="label">Pick a date & time to auto-publish</label>
            <div className="row" style={{ alignItems: "center" }}>
              <input className="input" type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} style={{ maxWidth: 280 }} />
              <button className="btn btn-primary" onClick={confirmSchedule} disabled={!when}>Add to calendar</button>
            </div>
            <p className="muted" style={{ fontSize: 12, margin: "10px 0 0" }}>
              In the full product this connects to your social accounts and posts automatically. In this demo it’s saved to your calendar.
            </p>
          </div>
        )}

        <div className="divider" />

        {r.headline ? <Piece title="Headline">{r.headline}</Piece> : null}
        {r.caption ? <Piece title="Caption">{r.caption}</Piece> : null}
        {Array.isArray(r.hashtags) && r.hashtags.length ? (
          <Piece title="Hashtags">
            <div className="chips" style={{ marginTop: 2 }}>
              {r.hashtags.map((h, i) => <span className="chip on" key={i}>#{String(h).replace(/^#/, "")}</span>)}
            </div>
          </Piece>
        ) : null}
        {r.script ? <Piece title="15-second video script"><span style={{ whiteSpace: "pre-wrap" }}>{r.script}</span></Piece> : null}

        <p className="muted center" style={{ fontSize: 12, marginTop: 16 }}>Drafted by AI — review and tweak before publishing.</p>
      </main>
    </>
  );
}
