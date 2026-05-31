/**
 * Invoixy SVG Logo Components
 *
 * InvoixyIcon  — Square icon mark only (login screen, favicon, mobile)
 * InvoixyLogo  — Horizontal: icon + "Invoixy" wordmark (navbar, drawer)
 */

/* ── Icon Mark ───────────────────────────────────────────────────────────
   Clean, minimal document icon on a purple gradient background.
   Designed to look crisp at any size from 16px to 256px.
────────────────────────────────────────────────────────────────────────── */
export function InvoixyIcon({ size = 40 }: { size?: number }) {
  const uid = "inv";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Invoixy"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#6040ff" />
          <stop offset="50%"  stopColor="#4318ff" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>
        <linearGradient id={`${uid}-shine`} x1="0" y1="0" x2="0" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0"   />
        </linearGradient>
      </defs>

      {/* Rounded square background */}
      <rect width="48" height="48" rx="12" fill={`url(#${uid}-bg)`} />
      {/* Top-half shine for depth */}
      <rect width="48" height="28" rx="12" fill={`url(#${uid}-shine)`} />
      {/* Thin border for separation */}
      <rect width="48" height="48" rx="12" stroke="white" strokeOpacity="0.18" strokeWidth="1" fill="none" />

      {/*
       * Document shape:
       *   Top-left   → bottom-left → bottom-right → up right side → fold diagonal → close
       *   Fold: top-right corner is "dog-eared" (cut at 45°)
       *
       *   Document sits at: x:11 y:9   w:19  h:26  (fold cut: 6px)
       */}
      <path
        d="M11 13 Q11 9 15 9 L24 9 L30 15 L30 33 Q30 35 28 35 L13 35 Q11 35 11 33 Z"
        fill="white"
        fillOpacity="0.97"
      />
      {/* Dog-ear fold triangle — darker white to show depth */}
      <path
        d="M24 9 L30 15 L24 15 Z"
        fill="white"
        fillOpacity="0.45"
      />
      {/* Crease line */}
      <line x1="24" y1="9" x2="24" y2="15" stroke="white" strokeOpacity="0.3" strokeWidth="0.6" />
      <line x1="24" y1="15" x2="30" y2="15" stroke="white" strokeOpacity="0.3" strokeWidth="0.6" />

      {/* Invoice line items — 3 rows */}
      <rect x="15" y="20" width="11" height="1.8" rx="0.9" fill="#4318ff" fillOpacity="0.5" />
      <rect x="15" y="24" width="8.5" height="1.8" rx="0.9" fill="#4318ff" fillOpacity="0.35" />
      <rect x="15" y="28" width="6"   height="1.8" rx="0.9" fill="#4318ff" fillOpacity="0.25" />
    </svg>
  );
}

/* ── Full horizontal wordmark ─────────────────────────────────────────────
   Icon mark + "Invoixy" gradient text — navbar, mobile drawer.
────────────────────────────────────────────────────────────────────────── */
export function InvoixyLogo({
  iconSize = 32,
  className = "",
}: {
  iconSize?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <InvoixyIcon size={iconSize} />
      <span
        style={{
          fontSize: Math.round(iconSize * 0.63),
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          background: "linear-gradient(135deg, #1e0a6e 0%, #4318ff 55%, #6d28d9 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Invoixy
      </span>
    </span>
  );
}
