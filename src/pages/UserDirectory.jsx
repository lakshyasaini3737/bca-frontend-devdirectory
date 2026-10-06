import { useMemo, useState } from 'react';
import AlertBanner from '../components/AlertBanner';
import SkeletonLoader from '../components/SkeletonLoader';
import UserCard from '../components/UserCard';
import useDebounce from '../hooks/useDebounce';
import useFetch from '../hooks/useFetch';
import { getUsers } from '../services/postService';

export default function UserDirectory() {
  const { data: users, loading, error, reload } = useFetch(getUsers, []);
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 250);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!users) return [];
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.company?.name.toLowerCase().includes(q)
    );
  }, [users, debounced]);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Developer Directory</h1>
          <p className="muted">Search your engineering org by name or company.</p>
        </div>
        {users && <span className="chip">{filtered.length} / {users.length} developers</span>}
      </div>

      <div className="search-box">
        <span aria-hidden="true">🔎</span>
        <input
          type="search"
          placeholder='Try "Leanne" or "Romaguera"…'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search developers"
        />
        {query && (
          <button className="alert-close" onClick={() => setQuery('')} aria-label="Clear search">
            ✕
          </button>
        )}
      </div>

      {error && <AlertBanner message={error} onRetry={reload} />}
      {loading && <SkeletonLoader variant="card" count={6} />}

      {!loading && !error && filtered.length > 0 && (
        <div className="user-grid">
          {filtered.map((u) => (
            <UserCard key={u.id} user={u} />
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="card empty-state">
          <span>🕵️</span>
          <h3>No developers found</h3>
          <p className="muted">Nothing matches “{debounced}”. Try another name or company.</p>
          <button className="btn btn-ghost" onClick={() => setQuery('')}>Clear search</button>
        </div>
      )}
    </>
  );
}
