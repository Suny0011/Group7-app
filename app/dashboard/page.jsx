"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { getUser, getProjects, deleteProject } from "@/lib/store";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    setUser(u);
    setProjects(getProjects());
    setReady(true);
  }, [router]);

  function remove(id) {
    deleteProject(id);
    setProjects(getProjects());
  }

  if (!ready) return <><Nav /><main className="container" style={{ padding: 40 }} /></>;

  return (
    <>
      <Nav />
      <main className="container shell fade" style={{ paddingTop: 28, paddingBottom: 60 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="eyebrow">Your studio</span>
            <h1 className="h2" style={{ fontSize: 28, marginTop: 6 }}>Hi {user.name}, ready to create?</h1>
          </div>
          <Link href="/brief" className="btn btn-primary">+ New brief</Link>
        </div>

        <div className="divider" />

        {projects.length === 0 ? (
          <div className="card card-pad center">
            <div className="spark" style={{ background: "#FFEFF1", color: "#FF5B6E", margin: "0 auto 12px", width: 44, height: 44, fontSize: 22 }}>⚡</div>
            <h2 className="h2" style={{ fontSize: 18 }}>No projects yet</h2>
            <p className="muted">Start your first brief and VividForge will draft media for you.</p>
            <Link href="/brief" className="btn btn-primary" style={{ marginTop: 6 }}>Create your first piece</Link>
          </div>
        ) : (
          <div className="grid grid-2">
            {projects.map((p) => (
              <div className="card" key={p.id}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span className="tag">{p.platform}</span>
                  <button className="copybtn" style={{ color: "#B9006E" }} onClick={() => remove(p.id)}>Delete</button>
                </div>
                <h2 className="h2" style={{ fontSize: 17, marginTop: 10 }}>{p.businessName || "Untitled"}</h2>
                <p className="muted" style={{ margin: "4px 0 12px", fontSize: 14 }}>
                  {p.result?.headline || p.goal}
                </p>
                <Link href={`/result/${p.id}`} className="btn btn-ghost btn-block">View media</Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
