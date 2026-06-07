export default function Badge({ children, color = "pink", className = "" }) {
  const colors = {
    pink: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    yellow: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${colors[color]} ${className}`}
    >
      {children}
    </span>
  );
}