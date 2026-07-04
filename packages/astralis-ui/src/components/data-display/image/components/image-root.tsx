import { forwardRef, useState } from "react";
import { ImageLightbox } from "./image-lightbox";
import {
  ASPECT_RATIO_MAP,
  DEFAULT_PLACEHOLDER,
  FIT_MAP,
  ROUNDED_MAP,
} from "./image.constants";
import type { ImageProps } from "../image.types";

export const ImageRoot = forwardRef<HTMLImageElement, ImageProps>(
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

    const ratioStyle: React.CSSProperties = aspectRatio
      ? {
          aspectRatio: ASPECT_RATIO_MAP[aspectRatio] ?? aspectRatio,
          position: "relative",
          overflow: "hidden",
        }
      : {};

    const imageElement = hasError ? (
      fallback ? (
        <>{fallback}</>
      ) : (
        <div
          className={[
            "astralis:flex astralis:flex-col astralis:items-center astralis:justify-center astralis:gap-2",
            "astralis:bg-surface-muted astralis:text-label-subtle",
            roundedClass,
            aspectRatio ? "astralis:absolute astralis:inset-0" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={aspectRatio ? {} : { width, height: height ?? 160 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="astralis:h-8 astralis:w-8"
          >
            <path d="M21.9 21.9l-8.49-8.49-9.82-9.82L2.1 2.1.69 3.51 3 5.83V19c0 1.1.9 2 2 2h13.17l2.31 2.31 1.42-1.41zM5 18l3.5-4.5 2.5 3.01L12.17 15l3 3H5zm16 .17L6.83 5H19c1.1 0 2 .9 2 2v11.17z" />
          </svg>
          <span className="astralis:text-xs">Failed to load</span>
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
          "astralis:transition-opacity astralis:duration-200",
          fitClass,
          roundedClass,
          isLoading
            ? "astralis:animate-pulse astralis:bg-surface-muted"
            : "",
          placeholder === "blur" && isLoading ? "astralis:blur-sm" : "",
          preview ? "astralis:cursor-zoom-in" : "",
          aspectRatio
            ? "astralis:absolute astralis:inset-0 astralis:h-full astralis:w-full"
            : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={aspectRatio ? {} : { width, height, ...style }}
      />
    );

    const wrapped = aspectRatio ? (
      <div style={{ ...ratioStyle, width, ...style }}>{imageElement}</div>
    ) : (
      imageElement
    );

    return (
      <>
        {caption ? (
          <figure className="astralis:inline-block">
            {wrapped}
            <figcaption className="astralis:mt-1.5 astralis:text-xs astralis:text-center astralis:text-label-muted">
              {caption}
            </figcaption>
          </figure>
        ) : (
          wrapped
        )}
        {preview && isOpen && !hasError && (
          <ImageLightbox src={src} alt={alt} onClose={() => setIsOpen(false)} />
        )}
      </>
    );
  },
);

ImageRoot.displayName = "Image";
