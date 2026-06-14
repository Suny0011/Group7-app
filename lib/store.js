// Lightweight client-side store. For an MVP this keeps everything in the browser
// so the app deploys with zero backend setup. Swap these for Supabase calls later.
const USER = "vf_user";
const PROJECTS = "vf_projects";
const BRAND = "vf_brandkit";

function read(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function write(key, val) {
  if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(val));
}

export const getUser = () => read(USER, null);
export const setUser = (u) => write(USER, u);
export const logout = () => { if (typeof window !== "undefined") localStorage.removeItem(USER); };

export const getProjects = () => read(PROJECTS, []);
export const getProject = (id) => getProjects().find((p) => p.id === id);
export function saveProject(project) {
  const all = getProjects();
  all.unshift(project);
  write(PROJECTS, all);
}
export function deleteProject(id) {
  write(PROJECTS, getProjects().filter((p) => p.id !== id));
}

export const getBrandKit = () =>
  read(BRAND, { name: "VividForge", tagline: "Forge your story.", colors: ["#12173A", "#FF5B6E", "#27C4B0"], tone: "Energetic & professional" });
export const setBrandKit = (kit) => write(BRAND, kit);

export const uid = () => Math.random().toString(36).slice(2, 10);

// ---- Scheduled posts (mock content calendar) ----
const SCHEDULE = "vf_schedule";
export const getSchedule = () => read(SCHEDULE, []);
export function addScheduled(item) {
  const all = getSchedule();
  all.push(item);
  all.sort((a, b) => new Date(a.date) - new Date(b.date));
  write(SCHEDULE, all);
}
export function deleteScheduled(id) {
  write(SCHEDULE, getSchedule().filter((s) => s.id !== id));
}
