const COLORS = ['#4f8cff', '#22d3a6', '#f5b84b', '#ff7a90', '#a78bfa', '#38bdf8', '#fb923c'];

export default function Avatar({ name, size = 48 }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const color = COLORS[name.length % COLORS.length];
  return (
    <div className="avatar" style={{ width: size, height: size, background: color, fontSize: size * 0.38 }}>
      {initials}
    </div>
  );
}