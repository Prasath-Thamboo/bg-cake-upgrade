export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-porcelain/50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur">
      {children}
    </span>
  );
}
