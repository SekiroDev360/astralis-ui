import { forwardRef } from "react";
import type {
  CardRootProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardBodyProps,
  CardFooterProps,
} from "./card.types";

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

const SIZE_MAP = {
  sm: {
    root: "astralis-rounded-lg",
    header: "astralis-px-4 astralis-py-3",
    body: "astralis-px-4 astralis-py-3",
    footer: "astralis-px-4 astralis-py-3",
  },
  md: {
    root: "astralis-rounded-xl",
    header: "astralis-px-5 astralis-py-4",
    body: "astralis-px-5 astralis-py-4",
    footer: "astralis-px-5 astralis-py-4",
  },
  lg: {
    root: "astralis-rounded-2xl",
    header: "astralis-px-7 astralis-py-5",
    body: "astralis-px-7 astralis-py-5",
    footer: "astralis-px-7 astralis-py-5",
  },
};

const VARIANT_MAP = {
  elevated:
    "astralis-bg-surface-raised astralis-shadow-md astralis-border astralis-border-border-subtle",
  outline:
    "astralis-bg-transparent astralis-border astralis-border-border-default",
  filled:
    "astralis-bg-surface-sunken astralis-border astralis-border-transparent",
  unstyled: "",
};

/* ------------------------------------------------------------------ */
/* Context — pass size to children                                      */
/* ------------------------------------------------------------------ */

import { createContext, useContext } from "react";

interface CardContextValue {
  size: "sm" | "md" | "lg";
}

const CardContext = createContext<CardContextValue>({ size: "md" });
const useCardContext = () => useContext(CardContext);

/* ------------------------------------------------------------------ */
/* CardRoot                                                             */
/* ------------------------------------------------------------------ */

export const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(
  (
    {
      variant = "elevated",
      size = "md",
      hoverable = false,
      className = "",
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const sizeClasses = SIZE_MAP[size].root;
    const variantClasses = VARIANT_MAP[variant];

    return (
      <CardContext.Provider value={{ size }}>
        <div
          ref={ref}
          className={[
            "astralis-overflow-hidden astralis-transition-all astralis-duration-200",
            sizeClasses,
            variantClasses,
            hoverable &&
              "astralis-cursor-pointer hover:astralis-shadow-lg hover:-astralis-translate-y-0.5",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          style={style}
          {...rest}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  },
);
CardRoot.displayName = "Card.Root";

/* ------------------------------------------------------------------ */
/* CardHeader                                                           */
/* ------------------------------------------------------------------ */

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ extra, className = "", style, children, ...rest }, ref) => {
    const { size } = useCardContext();
    const { header } = SIZE_MAP[size];
    const hasExtra = extra !== undefined && extra !== null;

    return (
      <div
        ref={ref}
        className={[
          "astralis-flex astralis-items-start astralis-justify-between astralis-gap-3",
          hasExtra ? "astralis-border-b astralis-border-border-subtle" : "",
          header,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
        {...rest}
      >
        <div className="astralis-flex astralis-flex-col astralis-gap-1 astralis-min-w-0">
          {children}
        </div>
        {hasExtra && (
          <div className="astralis-shrink-0 astralis-flex astralis-items-center astralis-gap-2">
            {extra}
          </div>
        )}
      </div>
    );
  },
);
CardHeader.displayName = "Card.Header";

/* ------------------------------------------------------------------ */
/* CardTitle                                                            */
/* ------------------------------------------------------------------ */

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = "", style, children, ...rest }, ref) => (
    <h3
      ref={ref}
      className={[
        "astralis-font-semibold astralis-text-content-primary astralis-leading-snug astralis-text-base",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </h3>
  ),
);
CardTitle.displayName = "Card.Title";

/* ------------------------------------------------------------------ */
/* CardDescription                                                      */
/* ------------------------------------------------------------------ */

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className = "", style, children, ...rest }, ref) => (
  <p
    ref={ref}
    className={[
      "astralis-text-sm astralis-text-content-secondary astralis-leading-relaxed",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    style={style}
    {...rest}
  >
    {children}
  </p>
));
CardDescription.displayName = "Card.Description";

/* ------------------------------------------------------------------ */
/* CardBody                                                             */
/* ------------------------------------------------------------------ */

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className = "", style, children, ...rest }, ref) => {
    const { size } = useCardContext();
    const { body } = SIZE_MAP[size];
    return (
      <div
        ref={ref}
        className={[body, className].filter(Boolean).join(" ")}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
CardBody.displayName = "Card.Body";

/* ------------------------------------------------------------------ */
/* CardFooter                                                           */
/* ------------------------------------------------------------------ */

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", style, children, ...rest }, ref) => {
    const { size } = useCardContext();
    const { footer } = SIZE_MAP[size];
    return (
      <div
        ref={ref}
        className={[
          "astralis-flex astralis-items-center astralis-gap-3 astralis-border-t astralis-border-border-subtle",
          footer,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={style}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
CardFooter.displayName = "Card.Footer";
