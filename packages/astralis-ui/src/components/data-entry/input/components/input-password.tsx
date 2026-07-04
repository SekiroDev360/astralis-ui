import { forwardRef, useState } from "react";
import { InputBase } from "./input";
import type { InputPasswordProps } from "../input.types";
import { astralisMerge } from "../../../../utils/astralis-merge";
import { EyeIcon, EyeOffIcon } from "../../../icon/internal-icons";

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className = "", disabled, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="astralis:relative astralis:flex astralis:items-center">
        <div className="astralis:w-full">
          <InputBase
            ref={ref}
            type={visible ? "text" : "password"}
            disabled={disabled}
            className={astralisMerge("astralis:pr-10", className)}
            {...props}
          />
        </div>
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
          className="astralis:absolute astralis:right-3 astralis:z-10 astralis:flex astralis:items-center astralis:text-label-subtle astralis:transition-colors astralis:hover:text-label-muted astralis:disabled:cursor-not-allowed astralis:disabled:opacity-moderate"
        >
          {visible ? (
            <EyeOffIcon className="astralis:h-4 astralis:w-4" aria-hidden="true" />
          ) : (
            <EyeIcon className="astralis:h-4 astralis:w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  },
);

InputPassword.displayName = "Input.Password";
