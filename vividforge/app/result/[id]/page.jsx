"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { getUser, getProject } from "@/lib/store";

function Piece({ title, children }) {
  const [copied, setCopied] = useState(false);
  const text = typeof children === "string" ? children : "";
  function copy() {
    if (text && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      });
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

  useEffect(() => {
    if (!getUser()) { router.replace("/login"); return; }
    setProject(getProject(id) || null);
    setReady(true);
  }, [id, router]);

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

        <p className="muted center" style={{ fontSize: 12, marginTop: 16 }}>
          Drafted by AI — review and tweak before publishing.
        </p>
      </main>
    </>
  );
}
