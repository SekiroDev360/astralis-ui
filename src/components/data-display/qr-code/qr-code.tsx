import { useEffect, useRef, useState, useCallback } from "react";
import QRCode from "qrcode";
import type { QrCodeRootProps, QrCodeSize } from "./qr-code.types";

/* ------------------------------------------------------------------ */
/* Size map                                                             */
/* ------------------------------------------------------------------ */

const SIZE_PX: Record<QrCodeSize, number> = {
  sm: 96,
  md: 160,
  lg: 220,
  xl: 280,
};

/* ------------------------------------------------------------------ */
/* Spinner                                                              */
/* ------------------------------------------------------------------ */

function Spinner({ size }: { size: number }) {
  return (
    <svg
      width={size * 0.25}
      height={size * 0.25}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ animation: "astralis-qr-spin 0.8s linear infinite" }}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* QrCodeRoot                                                           */
/* ------------------------------------------------------------------ */

export function QrCodeRoot({
  value,
  size = "md",
  pixelSize,
  errorLevel = "M",
  color = "#000000",
  bgColor = "transparent",
  overlay,
  overlaySize = 20,
  status = "active",
  onRefresh,
  downloadable = false,
  downloadFileName = "qrcode",
  className = "",
  style,
}: QrCodeRootProps) {
  const px = pixelSize ?? SIZE_PX[size];
  const svgRef = useRef<HTMLDivElement>(null);
  const [svgString, setSvgString] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  /* Inject spinner keyframe once */
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("astralis-qr-keyframes")) return;
    const style = document.createElement("style");
    style.id = "astralis-qr-keyframes";
    style.textContent = `@keyframes astralis-qr-spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }, []);

  const generate = useCallback(async () => {
    if (!value) return;
    try {
      const svg = await QRCode.toString(value, {
        type: "svg",
        errorCorrectionLevel: errorLevel,
        color: {
          dark: color,
          light: bgColor === "transparent" ? "#ffffff00" : bgColor,
        },
        width: px,
        margin: 1,
      });
      setSvgString(svg);
      setError(null);
    } catch (e) {
      setError(String(e));
    }
  }, [value, errorLevel, color, bgColor, px]);

  useEffect(() => {
    generate();
  }, [generate]);

  /* ── Download ──────────────────────────────────────────────────── */
  const handleDownload = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${downloadFileName}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const overlaySizePx = (px * overlaySize) / 100;
  const overlayOffset = (px - overlaySizePx) / 2;

  const isObscured =
    status === "loading" || status === "expired" || status === "scanned";

  return (
    <div
      className={[
        "astralis-inline-flex astralis-flex-col astralis-items-center astralis-gap-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {/* QR Canvas */}
      <div
        className="astralis-relative astralis-rounded-lg astralis-border astralis-border-border-subtle astralis-bg-white astralis-overflow-hidden"
        style={{ width: px, height: px }}
      >
        {/* SVG QR code */}
        {!error && svgString && (
          <div
            ref={svgRef}
            style={{
              position: "absolute",
              inset: 0,
              filter: isObscured ? "blur(5px)" : "none",
              transition: "filter 0.3s",
            }}
            dangerouslySetInnerHTML={{ __html: svgString }}
          />
        )}

        {/* Error state */}
        {error && (
          <div className="astralis-absolute astralis-inset-0 astralis-flex astralis-items-center astralis-justify-center astralis-text-danger-500 astralis-text-xs astralis-p-2 astralis-text-center">
            Failed to generate QR code
          </div>
        )}

        {/* Status overlay */}
        {status === "loading" && (
          <div className="astralis-absolute astralis-inset-0 astralis-flex astralis-flex-col astralis-items-center astralis-justify-center astralis-gap-2 astralis-text-content-secondary">
            <Spinner size={px} />
            <span className="astralis-text-xs astralis-font-medium">
              Loading…
            </span>
          </div>
        )}
        {status === "expired" && (
          <div className="astralis-absolute astralis-inset-0 astralis-flex astralis-flex-col astralis-items-center astralis-justify-center astralis-gap-2 astralis-text-content-secondary">
            <svg
              width={px * 0.22}
              height={px * 0.22}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0z"
              />
            </svg>
            <span className="astralis-text-xs astralis-font-medium">
              Expired
            </span>
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="astralis-text-xs astralis-px-2 astralis-py-1 astralis-rounded astralis-bg-primary-600 astralis-text-white hover:astralis-bg-primary-700 astralis-transition-colors"
              >
                Refresh
              </button>
            )}
          </div>
        )}
        {status === "scanned" && (
          <div className="astralis-absolute astralis-inset-0 astralis-flex astralis-flex-col astralis-items-center astralis-justify-center astralis-gap-2 astralis-text-green-600">
            <svg
              width={px * 0.25}
              height={px * 0.25}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
              />
            </svg>
            <span className="astralis-text-xs astralis-font-semibold">
              Scanned!
            </span>
          </div>
        )}

        {/* Logo/icon overlay — only on active */}
        {overlay && status === "active" && (
          <div
            className="astralis-absolute astralis-flex astralis-items-center astralis-justify-center astralis-bg-white astralis-rounded-md astralis-shadow-sm astralis-border astralis-border-border-subtle astralis-overflow-hidden"
            style={{
              width: overlaySizePx,
              height: overlaySizePx,
              top: overlayOffset,
              left: overlayOffset,
            }}
          >
            {overlay}
          </div>
        )}
      </div>

      {/* Download button */}
      {downloadable && status === "active" && (
        <button
          onClick={handleDownload}
          className={[
            "astralis-inline-flex astralis-items-center astralis-gap-1.5 astralis-text-xs astralis-font-medium",
            "astralis-px-3 astralis-py-1.5 astralis-rounded-lg astralis-border astralis-border-border-subtle",
            "astralis-bg-surface-raised hover:astralis-bg-surface-sunken astralis-text-content-secondary",
            "astralis-transition-colors astralis-duration-150",
          ].join(" ")}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z" />
            <path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.97a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.779a.749.749 0 1 1 1.06-1.06l1.97 1.97Z" />
          </svg>
          Download SVG
        </button>
      )}
    </div>
  );
}

QrCodeRoot.displayName = "QrCode.Root";
