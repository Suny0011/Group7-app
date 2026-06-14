"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { Icon } from "@/lib/icons";
import { getUser, getSchedule, deleteScheduled } from "@/lib/store";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState([]);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!getUser()) { router.replace("/login"); return; }
    setPosts(getSchedule());
    setReady(true);
  }, [router]);

  function remove(id) { deleteScheduled(id); setPosts(getSchedule()); }

  if (!ready) return <><Nav /><main className="container" style={{ padding: 40 }} /></>;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = now.toLocaleString("en-US", { month: "long", year: "numeric" });

  // count posts per day in the current month
  const perDay = {};
  posts.forEach((p) => {
    const d = new Date(p.date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      perDay[d.getDate()] = (perDay[d.getDate()] || 0) + 1;
    }
  });

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <>
      <Nav />
      <main className="container shell fade" style={{ paddingTop: 28, paddingBottom: 60 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="eyebrow">Plan ahead</span>
            <h1 className="h2" style={{ fontSize: 28, marginTop: 6 }}>Content calendar</h1>
          </div>
          <Link href="/brief" className="btn btn-primary">+ New brief</Link>
        </div>

        {/* auto-publish explainer */}
        <div className="card card-pad" style={{ marginTop: 16, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <span className="tile-ic" style={{ background: "#E9FBF7", color: "#0E8F7E" }}><Icon name="publish" /></span>
          <div style={{ flex: 1, minWidth: 220 }}>
            <strong>Auto-publish</strong>
            <p className="muted" style={{ margin: "2px 0 0", fontSize: 14 }}>
              Connect your social accounts and VividForge posts each scheduled piece for you. <span className="pill pill-soon">Roadmap</span>
            </p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} />
            <span className="slider" />
          </label>
        </div>

        {/* month grid */}
        <div className="card card-pad" style={{ marginTop: 16 }}>
          <h2 className="h2" style={{ fontSize: 18 }}>{monthLabel}</h2>
          <div className="cal-grid cal-head">
            {WEEKDAYS.map((w) => <div key={w} className="cal-wd">{w}</div>)}
          </div>
          <div className="cal-grid">
            {cells.map((d, i) => (
              <div key={i} className={`cal-cell${d === now.getDate() ? " cal-today" : ""}${d ? "" : " cal-blank"}`}>
                {d && <span className="cal-num">{d}</span>}
                {d && perDay[d] ? <span className="cal-dot" title={`${perDay[d]} post(s)`}>{perDay[d]}</span> : null}
              </div>
            ))}
          </div>
        </div>

        {/* upcoming list */}
        <h2 className="h2" style={{ fontSize: 18, marginTop: 22 }}>Scheduled posts</h2>
        {posts.length === 0 ? (
          <div className="card card-pad center">
            <div className="spark" style={{ background: "#E9FBF7", color: "#0E8F7E", margin: "0 auto 12px", width: 44, height: 44, fontSize: 20 }}><Icon name="calendar" /></div>
            <p className="muted">No posts scheduled yet. Generate a draft, then hit <strong>Schedule</strong> to add it here.</p>
            <Link href="/brief" className="btn btn-primary" style={{ marginTop: 6 }}>Create a draft</Link>
          </div>
        ) : (
          <div className="grid" style={{ gap: 10 }}>
            {posts.map((p) => (
              <div className="card sched" key={p.id}>
                <div className="sched-when">
                  <Icon name="clock" />
                  {new Date(p.date).toLocaleString("en-AU", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <span className="tag">{p.platform}</span>
                  <p style={{ margin: "6px 0 0", fontWeight: 600 }}>{p.headline}</p>
                  <p className="muted" style={{ margin: 0, fontSize: 13 }}>{p.businessName}</p>
                </div>
                <span className="pill pill-ok">{auto ? "Auto-publish on" : "Manual"}</span>
                <button className="copybtn" style={{ color: "#B9006E" }} onClick={() => remove(p.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
