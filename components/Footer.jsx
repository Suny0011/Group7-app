import Link from "next/link";
import { BUSINESS, SOCIALS } from "@/lib/business";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand" style={{ color: "#fff" }}>
            <span className="spark">⚡</span> VividForge
          </div>
          <p className="footer-tag">Agency-quality digital media at self-service speed and price.</p>
          <div className="socials">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} title={s.name}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact us</Link>
          <Link href="/login">Sign in</Link>
        </div>

        <div>
          <h4>VividForge Pty Ltd</h4>
          <p className="footer-line">ABN: {BUSINESS.abn} <span className="temp">(temporary)</span></p>
          <p className="footer-line">ACN: {BUSINESS.acn} <span className="temp">(temporary)</span></p>
          <p className="footer-line">{BUSINESS.address}</p>
          <p className="footer-line"><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></p>
        </div>
      </div>

      <div className="footer-note">
        <span>This website/app is for a class assignment and not for commercial purposes.</span>
        <span>© {new Date().getFullYear()} VividForge — student project.</span>
      </div>
    </footer>
  );
}
