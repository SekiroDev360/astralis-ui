import { useCallback, useEffect, useState } from "react";
import { FIT_MAP, ROUNDED_MAP } from "./image.constants";
import { ImageLightbox } from "./image-lightbox";
import type { ImageGroupProps } from "../image.types";

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

export function ImageGroup({
  items,
  columns = 3,
  gap = "md",
  rounded = "md",
  objectFit = "cover",
  className = "",
  style,
}: ImageGroupProps) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (previewIndex === null) return;
      if (event.key === "Escape") setPreviewIndex(null);
      if (event.key === "ArrowLeft") {
        setPreviewIndex((value) => (value! > 0 ? value! - 1 : value));
      }
      if (event.key === "ArrowRight") {
        setPreviewIndex((value) =>
          value! < items.length - 1 ? value! + 1 : value,
        );
      }
    },
    [previewIndex, items.length],
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
        {items.map((item, index) => (
          <div
            key={index}
            className={[
              "astralis-overflow-hidden astralis-cursor-zoom-in astralis-aspect-square",
              ROUNDED_MAP[rounded],
            ].join(" ")}
            onClick={() => setPreviewIndex(index)}
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

      {previewIndex !== null && (
        <ImageLightbox
          src={items[previewIndex].src}
          alt={items[previewIndex].alt}
          onClose={() => setPreviewIndex(null)}
          hasPrev={previewIndex > 0}
          hasNext={previewIndex < items.length - 1}
          onPrev={() => setPreviewIndex((value) => Math.max(0, value! - 1))}
          onNext={() =>
            setPreviewIndex((value) => Math.min(items.length - 1, value! + 1))
          }
        />
      )}
    </>
  );
}

ImageGroup.displayName = "ImageGroup";
