import { useState, type FormEvent } from "react";
import { api } from "../api";
import type { Profile } from "../types";

export function Contact({ profile }: { profile: Profile }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [note, setNote] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setNote("");
    try {
      const result = await api.contact({
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        subject: String(data.get("subject") || "Project inquiry"),
        message: String(data.get("message") || ""),
      });
      setStatus("ok");
      setNote(result.message || "Sent.");
      form.reset();
    } catch (error) {
      setStatus("err");
      setNote(error instanceof Error ? error.message : "Could not send.");
    }
  }

  return (
    <section className="section" id="contact">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="kicker">07 — Contact</div>
            <h2>Start a working conversation.</h2>
          </div>
        </div>
        <div className="contact-grid">
          <div>
            <p className="lede" style={{ marginBottom: 0 }}>
              Remote-friendly. I take on product builds, API work, performance passes, and systems that have to stay up.
            </p>
            <div className="contact-list">
              <div>
                <small>Email</small>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div>
                <small>Phone</small>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
              </div>
              <div>
                <small>LinkedIn</small>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  linkedin.com/in/yohannes-kefale
                </a>
              </div>
              <div>
                <small>GitHub</small>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  github.com/jome1204
                </a>
              </div>
            </div>
          </div>
          <form className="panel" onSubmit={onSubmit}>
            <label>
              Name
              <input name="name" required minLength={2} autoComplete="name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              Subject
              <input name="subject" placeholder="MERN build, API, or infrastructure" />
            </label>
            <label>
              Message
              <textarea name="message" required minLength={12} placeholder="What are we building?" />
            </label>
            <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <div className={`form-status ${status === "ok" ? "ok" : status === "err" ? "err" : ""}`}>
              {note}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
