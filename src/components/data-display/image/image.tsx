import { forwardRef, useState, useCallback, useEffect } from "react";
import type { ImageProps, ImageGroupProps } from "./image.types";

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

const ASPECT_RATIO_MAP: Record<string, string> = {
  square: "1 / 1",
  video: "16 / 9",
  portrait: "3 / 4",
  wide: "21 / 9",
};

const ROUNDED_MAP: Record<string, string> = {
  none: "astralis-rounded-none",
  sm: "astralis-rounded-sm",
  md: "astralis-rounded-md",
  lg: "astralis-rounded-lg",
  xl: "astralis-rounded-xl",
  "2xl": "astralis-rounded-2xl",
  "3xl": "astralis-rounded-3xl",
  full: "astralis-rounded-full",
};

const FIT_MAP: Record<string, string> = {
  contain: "astralis-object-contain",
  cover: "astralis-object-cover",
  fill: "astralis-object-fill",
  none: "astralis-object-none",
  "scale-down": "astralis-object-scale-down",
};

const DEFAULT_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNkI3MjgwIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDE2LDY0SDk2YTY0LjA3LDY0LjA3LDAsMCwwLTY0LDY0VjM4NGE2NC4wNyw2NC4wNywwLDAsMCw2NCw2NEg0MTZhNjQuMDcsNjQuMDcsMCwwLDAsNjQtNjRWMTI4QTY0LjA3LDY0LjA3LDAsMCwwLDQxNiw2NFpNMzM2LDEyOGE0OCw0OCwwLDEsMSw0OCw0OEE0OC4wNSw0OC4wNSwwLDAsMSwzMzYsMTI4Wk05Niw0MTZhMzIsMzIsMCwwLDEtMzItMzJWMzE2LjM3bDk0Ljg0LTg0LjNhNDguMDYsNDguMDYsMCwwLDEsNjUuOCwxLjlsNjQuOTUsNjQuODFMMTcyLjM3LDQxNlpNNDQ4LDM4NGEzMiwzMiwwLDAsMSczMiwzMkgyMTcuNjNMMzM5LjA1LDI5NC41OGE0Ny43Miw0Ny43MiwwLDAsMSw2MS42NC0uMTZMNDQ4LDMzMy44NFoiLz48L3N2Zz4=";

/* ------------------------------------------------------------------ */
/* Preview Lightbox                                                     */
/* ------------------------------------------------------------------ */

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

function Lightbox({
  src,
  alt,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: LightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="astralis-fixed astralis-inset-0 astralis-z-50 astralis-flex astralis-flex-col astralis-items-center astralis-justify-center"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      {/* Toolbar */}
      <div
        className="astralis-absolute astralis-top-4 astralis-right-4 astralis-flex astralis-items-center astralis-gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Zoom out */}
        <button
          className="astralis-h-9 astralis-w-9 astralis-rounded-full astralis-flex astralis-items-center astralis-justify-center astralis-bg-white/10 hover:astralis-bg-white/20 astralis-text-white astralis-transition-colors"
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
          title="Zoom out"
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis-h-4 astralis-w-4"
          >
            <path d="M3.5 7.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5zM11.354 11.354a1 1 0 0 0 1.415-1.414l-4-4a1 1 0 0 0-1.414 1.414l4 4z" />
            <path d="M6.5 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
          </svg>
        </button>
        {/* Zoom in */}
        <button
          className="astralis-h-9 astralis-w-9 astralis-rounded-full astralis-flex astralis-items-center astralis-justify-center astralis-bg-white/10 hover:astralis-bg-white/20 astralis-text-white astralis-transition-colors"
          onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
          title="Zoom in"
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis-h-4 astralis-w-4"
          >
            <path d="M6.5 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
            <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1A6.538 6.538 0 0 1 10.343 11.742zM6.5 13a.5.5 0 0 1-.5-.5V8H2.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 1 0V7h3.5a.5.5 0 0 1 0 1H7v3.5a.5.5 0 0 1-.5.5z" />
          </svg>
        </button>
        {/* Rotate */}
        <button
          className="astralis-h-9 astralis-w-9 astralis-rounded-full astralis-flex astralis-items-center astralis-justify-center astralis-bg-white/10 hover:astralis-bg-white/20 astralis-text-white astralis-transition-colors"
          onClick={() => setRotate((r) => r + 90)}
          title="Rotate"
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis-h-4 astralis-w-4"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        </button>
        {/* Close */}
        <button
          className="astralis-h-9 astralis-w-9 astralis-rounded-full astralis-flex astralis-items-center astralis-justify-center astralis-bg-white/10 hover:astralis-bg-white/20 astralis-text-white astralis-transition-colors"
          onClick={onClose}
          title="Close"
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis-h-4 astralis-w-4"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>

      {/* Prev arrow */}
      {hasPrev && (
        <button
          className="astralis-absolute astralis-left-4 astralis-h-10 astralis-w-10 astralis-rounded-full astralis-flex astralis-items-center astralis-justify-center astralis-bg-white/10 hover:astralis-bg-white/20 astralis-text-white astralis-transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onPrev?.();
          }}
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis-h-5 astralis-w-5"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw",
          maxHeight: "85vh",
          transform: `scale(${zoom}) rotate(${rotate}deg)`,
          transition: "transform 0.2s ease",
          borderRadius: 8,
          objectFit: "contain",
        }}
      />

      {/* Next arrow */}
      {hasNext && (
        <button
          className="astralis-absolute astralis-right-4 astralis-h-10 astralis-w-10 astralis-rounded-full astralis-flex astralis-items-center astralis-justify-center astralis-bg-white/10 hover:astralis-bg-white/20 astralis-text-white astralis-transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onNext?.();
          }}
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis-h-5 astralis-w-5"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Image (single)                                                       */
/* ------------------------------------------------------------------ */

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      className = "",
      style,
      width,
      height,
      objectFit = "cover",
      loading = "lazy",
      srcset,
      sizes,
      placeholder = "empty",
      rounded = "none",
      aspectRatio,
      fallback,
      caption,
      preview = false,
      onLoad,
      onError,
      ariaLabel,
    },
    ref,
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setIsError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleLoad = () => {
      setIsLoading(false);
      onLoad?.();
    };
    const handleError = () => {
      setIsLoading(false);
      setIsError(true);
      onError?.();
    };

    const placeholderSrc =
      placeholder !== "empty" && placeholder !== "blur"
        ? placeholder
        : DEFAULT_PLACEHOLDER;

    const roundedClass = ROUNDED_MAP[rounded] ?? "";
    const fitClass = FIT_MAP[objectFit] ?? "";

    /* Aspect ratio wrapper */
    const ratioStyle: React.CSSProperties = aspectRatio
      ? {
          aspectRatio: ASPECT_RATIO_MAP[aspectRatio] ?? aspectRatio,
          position: "relative",
          overflow: "hidden",
        }
      : {};

    const imgEl = hasError ? (
      fallback ? (
        <>{fallback}</>
      ) : (
        <div
          className={[
            "astralis-flex astralis-flex-col astralis-items-center astralis-justify-center astralis-gap-2",
            "astralis-bg-gray-100 dark:astralis-bg-gray-800 astralis-text-gray-400",
            roundedClass,
            aspectRatio ? "astralis-absolute astralis-inset-0" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={aspectRatio ? {} : { width, height: height ?? 160 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="astralis-h-8 astralis-w-8"
          >
            <path d="M21.9 21.9l-8.49-8.49-9.82-9.82L2.1 2.1.69 3.51 3 5.83V19c0 1.1.9 2 2 2h13.17l2.31 2.31 1.42-1.41zM5 18l3.5-4.5 2.5 3.01L12.17 15l3 3H5zm16 .17L6.83 5H19c1.1 0 2 .9 2 2v11.17z" />
          </svg>
          <span className="astralis-text-xs">Failed to load</span>
        </div>
      )
    ) : (
      <img
        ref={ref}
        src={isLoading ? placeholderSrc : src}
        alt={alt}
        aria-label={ariaLabel}
        width={width}
        height={height}
        loading={loading}
        srcSet={srcset}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        onClick={preview ? () => setIsOpen(true) : undefined}
        className={[
          "astralis-transition-opacity astralis-duration-200",
          fitClass,
          roundedClass,
          isLoading
            ? "astralis-animate-pulse astralis-bg-gray-200 dark:astralis-bg-gray-700"
            : "",
          placeholder === "blur" && isLoading ? "astralis-blur-sm" : "",
          preview ? "astralis-cursor-zoom-in" : "",
          aspectRatio
            ? "astralis-absolute astralis-inset-0 astralis-h-full astralis-w-full"
            : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={aspectRatio ? {} : { width, height, ...style }}
      />
    );

    const wrapped = aspectRatio ? (
      <div style={{ ...ratioStyle, width, ...style }}>{imgEl}</div>
    ) : (
      imgEl
    );

    return (
      <>
        {caption ? (
          <figure className="astralis-inline-block">
            {wrapped}
            <figcaption className="astralis-mt-1.5 astralis-text-xs astralis-text-center astralis-text-content-secondary">
              {caption}
            </figcaption>
          </figure>
        ) : (
          wrapped
        )}
        {preview && isOpen && !hasError && (
          <Lightbox src={src} alt={alt} onClose={() => setIsOpen(false)} />
        )}
      </>
    );
  },
);

Image.displayName = "Image";

/* ------------------------------------------------------------------ */
/* ImageGroup                                                           */
/* ------------------------------------------------------------------ */

const GAP_MAP = {
  sm: "astralis-gap-2",
  md: "astralis-gap-3",
  lg: "astralis-gap-4",
};
const COL_MAP: Record<number, string> = {
  2: "astralis-grid-cols-2",
  3: "astralis-grid-cols-3",
  4: "astralis-grid-cols-4",
};

function ImageGroup({
  items,
  columns = 3,
  gap = "md",
  rounded = "md",
  objectFit = "cover",
  className = "",
  style,
}: ImageGroupProps) {
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (previewIdx === null) return;
      if (e.key === "Escape") setPreviewIdx(null);
      if (e.key === "ArrowLeft") setPreviewIdx((i) => (i! > 0 ? i! - 1 : i));
      if (e.key === "ArrowRight")
        setPreviewIdx((i) => (i! < items.length - 1 ? i! + 1 : i));
    },
    [previewIdx, items.length],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <>
      <div
        className={["astralis-grid", COL_MAP[columns], GAP_MAP[gap], className]
          .filter(Boolean)
          .join(" ")}
        style={style}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={[
              "astralis-overflow-hidden astralis-cursor-zoom-in astralis-aspect-square",
              ROUNDED_MAP[rounded],
            ].join(" ")}
            onClick={() => setPreviewIdx(i)}
          >
            <img
              src={item.src}
              alt={item.alt}
              className={[
                "astralis-h-full astralis-w-full astralis-transition-transform astralis-duration-200 hover:astralis-scale-105",
                FIT_MAP[objectFit],
              ].join(" ")}
            />
          </div>
        ))}
      </div>

      {previewIdx !== null && (
        <Lightbox
          src={items[previewIdx].src}
          alt={items[previewIdx].alt}
          onClose={() => setPreviewIdx(null)}
          hasPrev={previewIdx > 0}
          hasNext={previewIdx < items.length - 1}
          onPrev={() => setPreviewIdx((i) => Math.max(0, i! - 1))}
          onNext={() =>
            setPreviewIdx((i) => Math.min(items.length - 1, i! + 1))
          }
        />
      )}
    </>
  );
}

ImageGroup.displayName = "ImageGroup";

export { Image, ImageGroup };
export default Image;
