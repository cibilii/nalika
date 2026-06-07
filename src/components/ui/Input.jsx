import { forwardRef } from "react";

const Input = forwardRef(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm text-zinc-400 font-medium">{label}</label>
        )}
        <input
          ref={ref}
          className={`bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30 transition-all ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-rose-400">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;