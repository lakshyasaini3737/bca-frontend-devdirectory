
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { money, payout, useProjects } from '../context/ProjectsContext.jsx';
import Avatar from '../components/Avatar.jsx';
import AlertBanner from '../components/AlertBanner.jsx';

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export default function ProjectDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const ctx = useProjects();

  const project = ctx.projects.find((p) => p.id === id);

  const [note, setNote] = useState('');
  const [hours, setHours] = useState(10);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  if (!project) {
    return (
      <main className="pd-page">
        <div className="pd-not-found">
          <span className="pd-not-found-icon">!</span>
          <h1>Project not found</h1>
          <p>
            This project does not exist or may have been removed.
          </p>
          <Link to="/projects" className="btn btn-primary">
            Back to projects
          </Link>
        </div>
      </main>
    );
  }

  const owner = ctx.isOwner(project, user);
  const team = ctx.team(project.id);
  const apps = ctx.applicationsFor(project.id);
  const mine = ctx.myApplication(project.id, user);
  const isMember =
    !!user && team.some((a) => a.email === user.email);
  const full = team.length >= project.slots;
  const messages = ctx.messages.filter(
    (m) => m.projectId === project.id
  );

  const apply = (e) => {
    e.preventDefault();

    if (note.trim().length < 20) {
      setErr(
        'Tell the owner about your experience in at least 20 characters.'
      );
      return;
    }

    ctx.applyToProject(project.id, user, note.trim(), Number(hours));
    setNote('');
    setErr('');
  };

  const send = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;

    ctx.postMessage(project.id, user, msg.trim());
    setMsg('');
  };

  return (
    <main className="pd-page">
      <nav className="pd-breadcrumb" aria-label="Breadcrumb">
        <Link to="/projects">
          <span aria-hidden="true">←</span> All projects
        </Link>
        <span className="pd-breadcrumb-divider">/</span>
        <span>Project details</span>
      </nav>

      <header className="pd-heading">
        <div className="pd-heading-copy">
          <span className="pd-eyebrow">PROJECT OVERVIEW</span>
          <h1>{project.title}</h1>
          <p>
            Posted by <strong>{project.ownerName}</strong>
            {' · '}
            {fmtDate(project.createdAt)}
          </p>
        </div>

        <span
          className={`pd-status pd-status-${project.status}`}
        >
          <span className="pd-status-dot" />
          {project.status.replace('-', ' ')}
        </span>
      </header>

      <div className="pd-layout">
        <div className="pd-main-column">
          <section className="pd-panel pd-overview">
            <div className="pd-panel-heading">
              <div>
                <span className="pd-eyebrow">THE OPPORTUNITY</span>
                <h2>About this project</h2>
              </div>
              <span className="pd-category">
                {project.category}
              </span>
            </div>

            <div className="pd-meta-row">
              <span className="pd-meta-item">
                <span className="pd-meta-icon">✦</span>
                {project.level}
              </span>
              <span className="pd-meta-item">
                <span className="pd-meta-icon">◷</span>
                {project.weeks} weeks
              </span>
            </div>

            <p className="pd-description">{project.description}</p>

            <div className="pd-divider" />

            <div className="pd-section-label">Skills you'll use</div>
            <div className="pd-skills">
              {project.skills.map((skill) => (
                <span key={skill} className="pd-skill">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {owner && (
            <section className="pd-panel pd-applications">
              <div className="pd-panel-heading pd-applications-heading">
                <div>
                  <span className="pd-eyebrow">YOUR CANDIDATES</span>
                  <h2>Applications</h2>
                  <p className="pd-subtitle">
                    Review applicants and build your team.
                  </p>
                </div>
                <span className="pd-count">{apps.length}</span>
              </div>

              <div className="pd-owner-actions">
                {project.status !== 'completed' && (
                  <button
                    type="button"
                    className="btn"
                    onClick={() =>
                      ctx.setStatus(project.id, 'completed')
                    }
                  >
                    Mark completed
                  </button>
                )}

                {project.status === 'open' && team.length > 0 && (
                  <button
                    type="button"
                    className="btn"
                    onClick={() =>
                      ctx.setStatus(project.id, 'in-progress')
                    }
                  >
                    Close applications
                  </button>
                )}
              </div>

              {apps.length === 0 ? (
                <div className="pd-empty">
                  <span className="pd-empty-symbol">✧</span>
                  <h3>No applications yet</h3>
                  <p>
                    Developer applications will appear here when
                    someone requests to join your project.
                  </p>
                </div>
              ) : (
                <div className="pd-application-list">
                  {apps.map((application) => (
                    <article
                      key={application.id}
                      className="pd-application"
                    >
                      <Avatar
                        name={application.name}
                        size={44}
                      />

                      <div className="pd-application-info">
                        <h3>{application.name}</h3>
                        <p className="pd-app-email">
                          {application.email}
                        </p>
                        <span className="pd-hours">
                          {application.hours} hours / week
                        </span>
                        <p className="pd-app-note">
                          {application.note}
                        </p>
                      </div>

                      <div className="pd-application-actions">
                        {application.status === 'pending' ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              disabled={full}
                              onClick={() =>
                                ctx.decideApplication(
                                  application.id,
                                  'approved'
                                )
                              }
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm"
                              onClick={() =>
                                ctx.decideApplication(
                                  application.id,
                                  'rejected'
                                )
                              }
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <span
                            className={`pd-status pd-status-${application.status}`}
                          >
                            {application.status}
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          <section className="pd-panel pd-team">
            <div className="pd-panel-heading">
              <div>
                <span className="pd-eyebrow">COLLABORATION</span>
                <h2>Meet the team</h2>
              </div>
              <span className="pd-count">
                {team.length}/{project.slots}
              </span>
            </div>

            <div className="pd-team-progress">
              <div
                className="pd-team-progress-fill"
                style={{
                  width: `${
                    project.slots > 0
                      ? Math.min(
                          100,
                          (team.length / project.slots) * 100
                        )
                      : 0
                  }%`,
                }}
              />
            </div>

            <p className="pd-subtitle">
              {full
                ? 'All team spots are filled.'
                : `${project.slots - team.length} team spot${
                    project.slots - team.length === 1 ? '' : 's'
                  } remaining`}
            </p>

            {team.length === 0 ? (
              <div className="pd-empty pd-team-empty">
                <span className="pd-empty-symbol">♧</span>
                <h3>Your team starts here</h3>
                <p>
                  Approved team members will appear in this section.
                </p>
              </div>
            ) : (
              <div className="pd-team-list">
                {team.map((member) => (
                  <div className="pd-team-member" key={member.id}>
                    <Avatar name={member.name} size={40} />
                    <div className="pd-team-member-info">
                      <strong>{member.name}</strong>
                      <span>{member.email}</span>
                    </div>
                    <span className="pd-member-badge">
                      {member.email === project.ownerEmail
                        ? 'Owner'
                        : 'Member'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {(owner || isMember) && (
            <section className="pd-panel pd-chat-panel">
              <div className="pd-panel-heading">
                <div>
                  <span className="pd-eyebrow">PRIVATE WORKSPACE</span>
                  <h2>Team room</h2>
                  <p className="pd-subtitle">
                    Share updates and keep the team in sync.
                  </p>
                </div>
                <span className="pd-chat-indicator">
                  <span /> Team only
                </span>
              </div>

              <div className="pd-chat">
                {messages.length === 0 ? (
                  <div className="pd-chat-empty">
                    <span className="pd-empty-symbol">✉</span>
                    <p>
                      No messages yet. Send the first update to your
                      team.
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`pd-message ${
                        message.email === user.email
                          ? 'pd-message-me'
                          : ''
                      }`}
                    >
                      <div className="pd-message-top">
                        <strong>{message.name}</strong>
                        <span>{fmtDate(message.createdAt)}</span>
                      </div>
                      <p>{message.text}</p>
                    </div>
                  ))
                )}
              </div>

              <form className="pd-chat-form" onSubmit={send}>
                <input
                  className="input"
                  placeholder="Write a message to your team..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  maxLength={300}
                  aria-label="Team message"
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!msg.trim()}
                >
                  Send <span aria-hidden="true">↗</span>
                </button>
              </form>
            </section>
          )}
        </div>

        <aside className="pd-sidebar">
          <section className="pd-panel pd-payment">
            <span className="pd-eyebrow">PROJECT REWARD</span>
            <p className="pd-payment-label">Payout per member</p>
            <div className="pd-payout">
              {money(payout(project))}
            </div>
            <p className="pd-payment-caption">
              Estimated payout for each team member.
            </p>

            <div className="pd-payment-divider" />

            <div className="pd-fact">
              <span>Total project budget</span>
              <strong>{money(project.budget)}</strong>
            </div>
            <div className="pd-fact">
              <span>Hourly rate</span>
              <strong>${project.rate}/hr</strong>
            </div>
            <div className="pd-fact">
              <span>Project duration</span>
              <strong>{project.weeks} weeks</strong>
            </div>
            <div className="pd-fact">
              <span>Team capacity</span>
              <strong>
                {team.length} / {project.slots}
              </strong>
            </div>

            <div className="pd-payment-note">
              <span>ⓘ</span>
              <p>
                Payment is released in USD by the project owner after
                the work is accepted.
              </p>
            </div>

            {!user && (
              <Link
                to="/login"
                state={{
                  from: {
                    pathname: `/projects/${project.id}`,
                  },
                }}
                className="btn btn-primary pd-primary-action"
              >
                Login to apply <span aria-hidden="true">↗</span>
              </Link>
            )}

            {user && owner && (
              <div className="pd-inline-alert">
                <strong>You're the owner</strong>
                <span>Manage applications and your team below.</span>
              </div>
            )}

            {user && !owner && mine && (
              <div className={`pd-inline-alert pd-alert-${mine.status}`}>
                <strong>Your application: {mine.status}</strong>
                <span>
                  {mine.status === 'approved'
                    ? 'Your request was approved.'
                    : mine.status === 'rejected'
                      ? 'Your request was not approved.'
                      : 'Waiting for the owner to review your request.'}
                </span>
              </div>
            )}

            {user &&
              !owner &&
              !mine &&
              project.status === 'open' &&
              !full && (
                <form
                  onSubmit={apply}
                  className="pd-apply-form"
                >
                  <div className="pd-form-heading">
                    <h3>Join this project</h3>
                    <p>Tell the owner why you're a good fit.</p>
                  </div>

                  <label htmlFor="pd-application-note">
                    Your introduction
                  </label>
                  <textarea
                    id="pd-application-note"
                    className="input"
                    rows={5}
                    placeholder="Share your relevant skills and experience..."
                    value={note}
                    onChange={(e) => {
                      setNote(e.target.value);
                      if (err) setErr('');
                    }}
                    maxLength={1000}
                    required
                  />
                  <span className="pd-character-count">
                    {note.length}/1000 characters
                  </span>

                  <label htmlFor="pd-hours">
                    Hours available per week
                  </label>
                  <select
                    id="pd-hours"
                    className="input"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  >
                    {[5, 10, 15, 20, 30, 40].map((hour) => (
                      <option key={hour} value={hour}>
                        {hour} hours / week
                      </option>
                    ))}
                  </select>

                  <AlertBanner
                    message={err}
                    onClose={() => setErr('')}
                  />

                  <button
                    className="btn btn-primary pd-primary-action"
                    type="submit"
                  >
                    Request to join <span aria-hidden="true">↗</span>
                  </button>
                  <p className="pd-form-footnote">
                    Your request will be sent to the project owner.
                  </p>
                </form>
              )}

            {user &&
              !owner &&
              !mine &&
              (project.status !== 'open' || full) && (
                <div className="pd-inline-alert">
                  <strong>
                    {full ? 'Team is full' : 'Applications closed'}
                  </strong>
                  <span>
                    This project is not accepting new applications
                    right now.
                  </span>
                </div>
              )}
          </section>
        </aside>
      </div>
    </main>
  );
}
