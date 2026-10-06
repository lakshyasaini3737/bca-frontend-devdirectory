import { useState } from 'react';
import AlertBanner from '../components/AlertBanner';
import useFetch from '../hooks/useFetch';
import { getErrorMessage } from '../services/api';
import { createPost, getUsers } from '../services/postService';

const LIMITS = { title: [5, 80], body: [20, 500] };
const EMPTY = { userId: '', title: '', body: '' };

function validate({ userId, title, body }) {
  const errors = {};
  if (!userId) errors.userId = 'Please choose an author.';
  const t = title.trim().length;
  if (t < LIMITS.title[0]) errors.title = `Title needs at least ${LIMITS.title[0]} characters.`;
  else if (t > LIMITS.title[1]) errors.title = `Title can have at most ${LIMITS.title[1]} characters.`;
  const b = body.trim().length;
  if (b < LIMITS.body[0]) errors.body = `Content needs at least ${LIMITS.body[0]} characters.`;
  else if (b > LIMITS.body[1]) errors.body = `Content can have at most ${LIMITS.body[1]} characters.`;
  return errors;
}

export default function AddPost() {
  const authors = useFetch(getUsers, []);
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState(null); // { type, message }

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const submit = async () => {
    setSubmitting(true);
    setNotice(null);
    try {
      const res = await createPost({
        title: form.title.trim(),
        body: form.body.trim(),
        userId: Number(form.userId),
      });
      if (res.status === 201) {
        setNotice({
          type: 'success',
          message: `Post published successfully! (id #${res.data.id}, status 201 Created)`,
        });
        setForm(EMPTY);
        setTouched({});
      } else {
        setNotice({ type: 'error', message: `Unexpected response status ${res.status}.` });
      }
    } catch (err) {
      setNotice({ type: 'error', message: getErrorMessage(err), retry: true });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ userId: true, title: true, body: true });
    if (isValid) submit();
  };

  const counter = (field) => {
    const len = form[field].trim().length;
    const [min, max] = LIMITS[field];
    const ok = len >= min && len <= max;
    return <small className={`counter ${ok ? 'ok' : ''}`}>{len} / {max}</small>;
  };

  return (
    <div className="narrow">
      <div className="page-head">
        <div>
          <h1>Publish a bulletin</h1>
          <p className="muted">Share documentation or updates with the whole engineering org.</p>
        </div>
      </div>

      {notice && (
        <AlertBanner
          type={notice.type}
          message={notice.message}
          onRetry={notice.retry ? submit : undefined}
          onDismiss={() => setNotice(null)}
        />
      )}
      {authors.error && <AlertBanner message={authors.error} onRetry={authors.reload} />}

      <form className="card form-card" onSubmit={handleSubmit} noValidate>
        <label className="field">
          <span>Author</span>
          <select
            name="userId"
            value={form.userId}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={authors.loading}
          >
            <option value="">
              {authors.loading ? 'Loading developers…' : 'Select an author'}
            </option>
            {authors.data?.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          {touched.userId && errors.userId && <small className="field-error">{errors.userId}</small>}
        </label>

        <label className="field">
          <span>Title {counter('title')}</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. How we cut build times by 40%"
          />
          {touched.title && errors.title && <small className="field-error">{errors.title}</small>}
        </label>

        <label className="field">
          <span>Body content {counter('body')}</span>
          <textarea
            name="body"
            rows="7"
            value={form.body}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Write your update here (20–500 characters)…"
          />
          {touched.body && errors.body && <small className="field-error">{errors.body}</small>}
        </label>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => { setForm(EMPTY); setTouched({}); }}
          >
            Reset
          </button>
          <button className="btn btn-primary" type="submit" disabled={!isValid || submitting}>
            {submitting ? 'Publishing…' : '🚀 Publish post'}
          </button>
        </div>
      </form>
    </div>
  );
}
