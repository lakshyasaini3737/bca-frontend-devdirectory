
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch.js';
import { getDeveloper } from '../services/developerService.js';
import { getPostsByUser } from '../services/postService.js';
import AlertBanner from '../components/AlertBanner.jsx';
import SkeletonLoader from '../components/SkeletonLoader.jsx';

const englishPosts = [
  {
    title: 'Building Better Web Experiences',
    body: 'A good web application should be easy to use, responsive on different screens, and accessible to all users. Clean code and thoughtful design help create a better experience.',
  },
  {
    title: 'Why Clean Code Matters',
    body: 'Readable code makes projects easier to understand, test, and maintain. Meaningful names, small functions, and consistent formatting help developers work together effectively.',
  },
  {
    title: 'Getting Started with Modern JavaScript',
    body: 'JavaScript helps developers build interactive websites. Learning functions, arrays, objects, modules, and asynchronous programming creates a strong foundation for frontend development.',
  },
  {
    title: 'Responsive Design Fundamentals',
    body: 'Responsive layouts adapt to mobile phones, tablets, and desktops. Flexible grids, suitable spacing, and media queries help keep a website useful on different screen sizes.',
  },
  {
    title: 'Learning React Step by Step',
    body: 'React applications are built from reusable components. Understanding props, state, event handling, and hooks makes it easier to create interactive user interfaces.',
  },
  {
    title: 'Working Together as a Developer',
    body: 'Clear communication, useful documentation, code reviews, and version control help teams build reliable software and solve problems together.',
  },
];

export default function UserProfile() {
  const { id } = useParams();

  const dev = useFetch(() => getDeveloper(id), [id]);

  const posts = useFetch(
    () =>
      dev.data
        ? getPostsByUser(dev.data.jpUserId)
        : Promise.resolve([]),
    [dev.data?.id]
  );

  if (dev.loading) {
    return (
      <main className="profile-page">
        <div className="profile-loading-heading">
          <span className="profile-eyebrow">DEVSPHERE COMMUNITY</span>
          <h1>Loading developer profile...</h1>
        </div>
        <SkeletonLoader count={1} />
      </main>
    );
  }

  if (dev.error || !dev.data) {
    return (
      <main className="profile-page">
        <section className="profile-message-card">
          <span className="profile-eyebrow">PROFILE UNAVAILABLE</span>
          <AlertBanner
            message={dev.error || 'Developer profile not found.'}
            onRetry={dev.retry}
          />
          <Link to="/users" className="btn btn-primary">
            <span aria-hidden="true">←</span> Back to developers
          </Link>
        </section>
      </main>
    );
  }

  const d = dev.data;
  const address = d.address || {};
  const skills = Array.isArray(d.skills) ? d.skills : [];
  const name = d.name || d.username || 'DevSphere Developer';

  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const publications = englishPosts.map((post, index) => ({
    ...post,
    id: index + 1,
  }));

  const location = [
    address.city || d.city,
    address.state,
    address.country || 'India',
  ].filter(Boolean).join(', ');

  return (
    <main className="profile-page">
      <nav className="profile-breadcrumb" aria-label="Breadcrumb">
        <Link to="/users">
          <span aria-hidden="true">←</span> All Developers
        </Link>
        <span aria-hidden="true">/</span>
        <span>{name}</span>
      </nav>

      <section className="profile-hero">
        <div className="profile-hero-glow" aria-hidden="true" />

        <div className="profile-identity">
          <div className="profile-photo profile-avatar-premium">
            {d.photo ? (
              <img
                src={d.photo}
                alt={`${name} profile`}
                width="120"
                height="120"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="profile-initials">
                {initials || 'DS'}
              </div>
            )}
          </div>

          <div className="profile-identity-copy">
            <span className="profile-eyebrow">
              <span aria-hidden="true">✦</span> DEVSPHERE MEMBER
            </span>

            <h1>{name}</h1>

            <p className="profile-role">
              {d.role || 'Developer'}
              {d.company ? ` at ${d.company}` : ''}
            </p>

            <p className="profile-location">
              <span aria-hidden="true">⌖</span>
              {location || 'Location not provided'}
            </p>

            <div className="profile-status-row">
              <span className={`profile-availability ${d.available ? 'is-available' : 'is-busy'}`}>
                <span className="online-dot" />
                {d.available ? 'Available for opportunities' : 'Currently busy'}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-hero-footer">
          <a
            href={d.email ? `mailto:${d.email}` : undefined}
            className={`profile-contact-button ${d.email ? '' : 'is-disabled'}`}
            aria-disabled={!d.email}
            onClick={!d.email ? (event) => event.preventDefault() : undefined}
          >
            Contact Developer <span aria-hidden="true">↗</span>
          </a>
          <span className="profile-member-mark">DS <span aria-hidden="true">✦</span></span>
        </div>
      </section>

      <section className="profile-stats-grid" aria-label="Developer statistics">
        <article className="profile-stat-card">
          <span className="profile-stat-icon" aria-hidden="true">$</span>
          <div>
            <strong>
              {d.rate != null ? `$${d.rate}` : '—'}
              <span className="profile-stat-unit">/hr</span>
            </strong>
            <span>Hourly Rate</span>
          </div>
        </article>

        <article className="profile-stat-card">
          <span className="profile-stat-icon" aria-hidden="true">↗</span>
          <div>
            <strong>{d.exp != null ? d.exp : '—'}</strong>
            <span>Years of Experience</span>
          </div>
        </article>

        <article className="profile-stat-card">
          <span className="profile-stat-icon" aria-hidden="true">⌘</span>
          <div>
            <strong>{skills.length}</strong>
            <span>Listed Skills</span>
          </div>
        </article>
      </section>

      <div className="profile-content-grid">
        <div className="profile-main-column">
          <section className="profile-panel">
            <div className="profile-section-heading">
              <div>
                <span className="profile-eyebrow">TECHNICAL EXPERTISE</span>
                <h2>Skills & Technologies</h2>
              </div>
              <span className="profile-section-count">
                {skills.length} {skills.length === 1 ? 'skill' : 'skills'}
              </span>
            </div>

            {skills.length > 0 ? (
              <div className="chips profile-skill-chips">
                {skills.map((skill) => (
                  <span key={skill} className="chip">{skill}</span>
                ))}
              </div>
            ) : (
              <p className="profile-muted-copy">
                No skills have been added to this profile yet.
              </p>
            )}
          </section>

          <section className="profile-posts-section">
            <div className="profile-section-heading">
              <div>
                <span className="profile-eyebrow">IDEAS & KNOWLEDGE</span>
                <h2>Latest Posts</h2>
                <p className="profile-muted-copy">
                  Developer community articles and learning notes.
                </p>
              </div>
              <span className="profile-section-count">06 articles</span>
            </div>

            {posts.error && (
              <AlertBanner message={posts.error} onRetry={posts.retry} />
            )}

            {posts.loading ? (
              <SkeletonLoader count={3} />
            ) : (
              <div className="profile-post-grid">
                {publications.map((post, index) => (
                  <article className="profile-post-card" key={post.id}>
                    <div className="profile-post-topline">
                      <span className="profile-post-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="profile-post-symbol" aria-hidden="true">↗</span>
                    </div>

                    <h3>{post.title}</h3>
                    <p>{post.body}</p>

                    <div className="profile-post-footer">
                      <span>Developer Insights</span>
                      <span aria-hidden="true">✦</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="profile-sidebar">
          <section className="profile-panel profile-contact-panel">
            <span className="profile-eyebrow">GET IN TOUCH</span>
            <h2>Contact Information</h2>
            <p className="profile-muted-copy">
              Connect with this developer to discuss ideas and opportunities.
            </p>

            <div className="profile-contact-list">
              <div className="profile-contact-item">
                <span className="profile-contact-icon" aria-hidden="true">@</span>
                <div>
                  <span>Email Address</span>
                  {d.email ? (
                    <a href={`mailto:${d.email}`}>{d.email}</a>
                  ) : (
                    <strong>Not provided</strong>
                  )}
                </div>
              </div>

              <div className="profile-contact-item">
                <span className="profile-contact-icon" aria-hidden="true">☎</span>
                <div>
                  <span>Phone Number</span>
                  {d.phone ? (
                    <a href={`tel:${d.phone}`}>{d.phone}</a>
                  ) : (
                    <strong>Not provided</strong>
                  )}
                </div>
              </div>

              <div className="profile-contact-item">
                <span className="profile-contact-icon" aria-hidden="true">⌖</span>
                <div>
                  <span>Location</span>
                  <strong>{location || 'Not provided'}</strong>
                </div>
              </div>

              {address.postalCode && (
                <div className="profile-contact-item">
                  <span className="profile-contact-icon" aria-hidden="true">#</span>
                  <div>
                    <span>PIN Code</span>
                    <strong>{address.postalCode}</strong>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="profile-opportunity-card">
            <span className="profile-opportunity-icon" aria-hidden="true">✦</span>
            <h2>Have a project in mind?</h2>
            <p>
              Explore projects and find opportunities to collaborate with the DevSphere community.
            </p>
            <Link to="/projects" className="profile-opportunity-link">
              Explore Projects <span aria-hidden="true">↗</span>
            </Link>
          </section>
        </aside>
      </div>

      <div className="profile-bottom-link">
        <Link to="/users">← Back to all developers</Link>
      </div>
    </main>
  );
}
