import InputGroupContext from "./input-group.context";
import type { InputGroupProps } from "./input.types";

/**
 * InputGroup — wraps an Input with prefix/suffix slots.
 * Uses context so the child Input can self-apply the correct padding.
 */
export function InputGroup({
  prefix,
  suffix,
  children,
  className = "",
}: InputGroupProps) {
  return (
    <InputGroupContext.Provider
      value={{ hasPrefix: !!prefix, hasSuffix: !!suffix }}
    >
      <div
        className={`astralis-relative astralis-flex astralis-items-center ${className}`}
      >
        {prefix && (
          <span className="astralis-absolute astralis-left-3 astralis-flex astralis-items-center astralis-text-content-tertiary astralis-pointer-events-none astralis-z-10">
            {prefix}
          </span>
        )}

        <div className="astralis-w-full">{children}</div>

        {suffix && (
          <span className="astralis-absolute astralis-right-3 astralis-flex astralis-items-center astralis-text-content-tertiary astralis-z-10">
            {suffix}
          </span>
        )}
      </div>
    </InputGroupContext.Provider>
  );
}
