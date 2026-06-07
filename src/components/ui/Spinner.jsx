export default function Spinner({ className = '' }) {
  return (
    <div className="flex justify-center items-center">
      <div className={`w-6 h-6 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin ${className}`} />
    </div>
  );
}