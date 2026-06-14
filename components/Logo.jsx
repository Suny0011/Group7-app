import { FaBolt } from "react-icons/fa";

export default function Logo({ dark = false }) {
  return (
    <span className="logo">
      <span className="logo-badge"><FaBolt /></span>
      <span className={`logo-word${dark ? " on-dark" : ""}`}>VividForge</span>
    </span>
  );
}
