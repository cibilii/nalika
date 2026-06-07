export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl shadow-black/10 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}