import { useEffect, useState } from "react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function ImageLightbox({
  src,
  alt,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: ImageLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && onPrev) onPrev();
      if (event.key === "ArrowRight" && onNext) onNext();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="astralis:fixed astralis:inset-0 astralis:z-50 astralis:flex astralis:flex-col astralis:items-center astralis:justify-center"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div
        className="astralis:absolute astralis:top-4 astralis:right-4 astralis:flex astralis:items-center astralis:gap-2"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="astralis:h-9 astralis:w-9 astralis:rounded-full astralis:flex astralis:items-center astralis:justify-center astralis:bg-white/10 astralis:hover:bg-white/20 astralis:text-white astralis:transition-colors"
          onClick={() => setZoom((value) => Math.max(0.5, value - 0.25))}
          title="Zoom out"
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis:h-4 astralis:w-4"
          >
            <path d="M3.5 7.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5zM11.354 11.354a1 1 0 0 0 1.415-1.414l-4-4a1 1 0 0 0-1.414 1.414l4 4z" />
            <path d="M6.5 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
          </svg>
        </button>
        <button
          className="astralis:h-9 astralis:w-9 astralis:rounded-full astralis:flex astralis:items-center astralis:justify-center astralis:bg-white/10 astralis:hover:bg-white/20 astralis:text-white astralis:transition-colors"
          onClick={() => setZoom((value) => Math.min(3, value + 0.25))}
          title="Zoom in"
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis:h-4 astralis:w-4"
          >
            <path d="M6.5 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
            <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1A6.538 6.538 0 0 1 10.343 11.742zM6.5 13a.5.5 0 0 1-.5-.5V8H2.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 1 0V7h3.5a.5.5 0 0 1 0 1H7v3.5a.5.5 0 0 1-.5.5z" />
          </svg>
        </button>
        <button
          className="astralis:h-9 astralis:w-9 astralis:rounded-full astralis:flex astralis:items-center astralis:justify-center astralis:bg-white/10 astralis:hover:bg-white/20 astralis:text-white astralis:transition-colors"
          onClick={() => setRotate((value) => value + 90)}
          title="Rotate"
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis:h-4 astralis:w-4"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        </button>
        <button
          className="astralis:h-9 astralis:w-9 astralis:rounded-full astralis:flex astralis:items-center astralis:justify-center astralis:bg-white/10 astralis:hover:bg-white/20 astralis:text-white astralis:transition-colors"
          onClick={onClose}
          title="Close"
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis:h-4 astralis:w-4"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>

      {hasPrev && (
        <button
          className="astralis:absolute astralis:left-4 astralis:h-10 astralis:w-10 astralis:rounded-full astralis:flex astralis:items-center astralis:justify-center astralis:bg-white/10 astralis:hover:bg-white/20 astralis:text-white astralis:transition-colors"
          onClick={(event) => {
            event.stopPropagation();
            onPrev?.();
          }}
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis:h-5 astralis:w-5"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>
      )}

      <img
        src={src}
        alt={alt}
        onClick={(event) => event.stopPropagation()}
        style={{
          maxWidth: "90vw",
          maxHeight: "85vh",
          transform: `scale(${zoom}) rotate(${rotate}deg)`,
          transition: "transform 0.2s ease",
          borderRadius: 8,
          objectFit: "contain",
        }}
      />

      {hasNext && (
        <button
          className="astralis:absolute astralis:right-4 astralis:h-10 astralis:w-10 astralis:rounded-full astralis:flex astralis:items-center astralis:justify-center astralis:bg-white/10 astralis:hover:bg-white/20 astralis:text-white astralis:transition-colors"
          onClick={(event) => {
            event.stopPropagation();
            onNext?.();
          }}
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="astralis:h-5 astralis:w-5"
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
