import InputGroupContext from "../input.context";
import type { InputGroupProps } from "../input.types";
import { astralisMerge } from "../../../../utils/astralis-merge";

/**
 * Wraps an Input with prefix/suffix slots. Uses context so the child Input can
 * self-apply the correct start/end padding.
 */
export function InputGroup({ prefix, suffix, children, className = "" }: InputGroupProps) {
  return (
    <InputGroupContext.Provider value={{ hasPrefix: !!prefix, hasSuffix: !!suffix }}>
      <div className={astralisMerge("astralis:relative astralis:flex astralis:items-center", className)}>
        {prefix && (
          <span className="astralis:absolute astralis:left-3 astralis:z-10 astralis:flex astralis:items-center astralis:text-label-subtle astralis:pointer-events-none">
            {prefix}
          </span>
        )}

        <div className="astralis:w-full">{children}</div>

        {suffix && (
          <span className="astralis:absolute astralis:right-3 astralis:z-10 astralis:flex astralis:items-center astralis:text-label-subtle">
            {suffix}
          </span>
        )}
      </div>
    </InputGroupContext.Provider>
  );
}

InputGroup.displayName = "InputGroup";
