import { forwardRef, useState } from "react";
import { InputBase } from "../input";
import type { InputPasswordProps } from "../input.types";

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className = "", ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="astralis-relative astralis-flex astralis-items-center">
        <div className="astralis-w-full [&>input]:astralis-pr-10">
          <InputBase
            ref={ref}
            type={visible ? "text" : "password"}
            className={className}
            {...props}
          />
        </div>
        <button
          type="button"
          tabIndex={-1}
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
          className="astralis-absolute astralis-right-3 astralis-flex astralis-items-center astralis-text-content-tertiary hover:astralis-text-content-secondary astralis-transition-colors astralis-z-10"
        >
          {visible ? (
            /* Eye-slash icon */
            <svg
              aria-hidden="true"
              className="astralis-h-4 astralis-w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            /* Eye icon */
            <svg
              aria-hidden="true"
              className="astralis-h-4 astralis-w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    );
  },
);

InputPassword.displayName = "Input.Password";
