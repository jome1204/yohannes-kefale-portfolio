import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import type { Profile } from "../types";

const links = [
  { to: { pathname: "/", hash: "work" }, label: "Work" },
  { to: { pathname: "/", hash: "experience" }, label: "Experience" },
  { to: { pathname: "/", hash: "about" }, label: "About" },
  { to: { pathname: "/", hash: "contact" }, label: "Contact" },
];

export function Nav({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="nav" data-scrolled={scrolled}>
      <div className="nav-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">YK</span>
          <span className="brand-loc">{profile.location}</span>
        </NavLink>
        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary">
          {links.map((link) => (
            <Link key={link.label} to={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
          <Link className="nav-cta" to={{ pathname: "/", hash: "contact" }} onClick={() => setOpen(false)}>
            Hire me
          </Link>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
