export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/40 px-3 py-1 text-xs font-semibold text-cocoa ring-1 ring-cocoa/10 backdrop-blur">
      {children}
    </span>
  );
}
