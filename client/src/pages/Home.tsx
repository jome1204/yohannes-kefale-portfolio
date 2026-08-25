import type { Profile, SkillGroup, Experience, Project } from "../types";
import { ProjectCard } from "../components/ProjectCard";
import { Contact } from "../components/Contact";

export function HomeView({
  profile,
  skills,
  experience,
  projects,
}: {
  profile: Profile;
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
}) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const shown = [...featured, ...rest].slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="hero-grid">
            <div>
              <div className="availability">
                <span className="dot" />
                {profile.availability}
              </div>
              <p className="kicker">{profile.title} · MERN</p>
              <h1>
                {profile.firstName}
                <span>{profile.lastName}</span>
              </h1>
              <p className="lede">
                {profile.headline}. I ship React and Node products for international clients, then keep the
                systems under them reliable — APIs, payments, and production infrastructure.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#work">
                  View selected work
                </a>
                <a className="btn btn-ghost" href={profile.resumeUrl} download>
                  Download CV
                </a>
              </div>
            </div>
            <div className="portrait">
              <div className="portrait-frame">
                <img
                  src={profile.photoUrl}
                  alt={`${profile.name} portrait`}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="portrait-meta">
                <strong>Top Rated · Upwork</strong>
                <span>100% positive client feedback</span>
              </div>
            </div>
          </div>
          <div className="stats">
            {profile.stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="kicker">01 — Profile</div>
              <h2>Product craft with production discipline.</h2>
            </div>
          </div>
          <div className="split">
            <div className="about-copy">
              <p>{profile.summary}</p>
              <p>
                Based in {profile.location}. Comfortable shipping remotely for international clients, then keeping
                the systems underneath — Linux, storage, and recovery — honest.
              </p>
              <div className="chip-row">
                {profile.languages.map((lang) => (
                  <span className="chip" key={lang.name}>
                    {lang.name} · {lang.level}
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-grid" id="skills">
              {skills.map((group) => (
                <article className="skill-card" key={group._id}>
                  <h3>{group.category}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="kicker">02 — Experience</div>
              <h2>Where the work has been.</h2>
            </div>
          </div>
          <div className="timeline">
            {experience.map((job) => (
              <article className="job" key={job._id}>
                <div className="job-meta">
                  {job.current ? <div className="now">Current</div> : null}
                  <div>{job.period}</div>
                  <div>{job.location}</div>
                </div>
                <div>
                  <h3>
                    {job.role} <span>/ {job.organization}</span>
                  </h3>
                  <ul>
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="kicker">03 — Selected work</div>
              <h2>Platforms, ops consoles, and systems.</h2>
            </div>
          </div>
          <div className="project-grid">
            {shown.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
          {projects.length > shown.length ? (
            <a className="more-link" href="https://github.com/jome1204" target="_blank" rel="noreferrer">
              More on GitHub →
            </a>
          ) : null}
        </div>
      </section>

      <section className="section" id="credentials">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="kicker">04 — Credentials</div>
              <h2>Education and training.</h2>
            </div>
          </div>
          <div className="cred-grid">
            {profile.education.map((item) => (
              <article className="panel" key={item.degree}>
                <h3>{item.degree}</h3>
                <p>
                  {item.school}
                  <br />
                  {item.detail}
                </p>
              </article>
            ))}
            <article className="panel">
              <h3>Certifications</h3>
              <ul>
                {profile.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <Contact profile={profile} />
    </>
  );
}
