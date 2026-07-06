import Link from "next/link";

/**
 * The Astralis mark: an eight-point compass rose. Four slender cardinal
 * points over four shorter diagonal points, each split lengthwise into a
 * light and dark facet — the fold is what gives it dimension. One arm of
 * each kind is defined once and rotated into place.
 */
const ROTATIONS = [0, 90, 180, 270];

export function AstralisMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <filter id="astralis-rose-shadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="0.8" stdDeviation="0.9" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#astralis-rose-shadow)">
        {/* Diagonal points — shorter, chunkier, tucked behind */}
        {ROTATIONS.map((deg) => (
          <g key={`d${deg}`} transform={`rotate(${deg} 16 16)`}>
            <path d="M22.8 9.2 L17.7 11.1 L16 16 Z" fill="var(--astralis-color-brand-500)" />
            <path d="M22.8 9.2 L20.9 14.3 L16 16 Z" fill="var(--astralis-color-brand-300)" />
          </g>
        ))}

        {/* Cardinal points — long and slender, on top */}
        {ROTATIONS.map((deg) => (
          <g key={`c${deg}`} transform={`rotate(${deg} 16 16)`}>
            <path d="M16 0.8 L14.15 12.4 L16 16 Z" fill="var(--astralis-color-brand-200)" />
            <path d="M16 0.8 L17.85 12.4 L16 16 Z" fill="var(--astralis-color-brand-500)" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 text-label transition-opacity hover:opacity-80"
    >
      <AstralisMark className="size-6 transition-transform duration-500 group-hover:rotate-45" />
      <span className="font-display text-[15px] font-semibold tracking-tight">
        Astralis
        <span className="ml-1.5 rounded-md border border-stroke-subtle bg-surface-subtle px-1.5 py-0.5 align-middle text-[10px] font-medium uppercase tracking-widest text-label-muted">
          UI
        </span>
      </span>
    </Link>
  );
}
