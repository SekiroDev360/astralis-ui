import type { TagColorScheme, TagSize, TagVariant } from "../tag.types";

export const SIZE_MAP: Record<TagSize, string> = {
  sm: "astralis-h-5 astralis-px-1.5 astralis-text-[10px]",
  md: "astralis-h-6 astralis-px-2 astralis-text-xs",
  lg: "astralis-h-8 astralis-px-3 astralis-text-sm",
};

export const CLOSE_ICON_SIZE_MAP: Record<TagSize, string> = {
  sm: "astralis-h-2.5 astralis-w-2.5 astralis-ml-1",
  md: "astralis-h-3 astralis-w-3 astralis-ml-1.5",
  lg: "astralis-h-3.5 astralis-w-3.5 astralis-ml-2",
};

export function getVariantClasses(
  variant: TagVariant,
  colorScheme: TagColorScheme,
) {
  const isNeutral = colorScheme === "neutral" || colorScheme === "gray";
  const c = colorScheme;

  if (variant === "solid") {
    if (isNeutral) {
      return "astralis-bg-gray-700 astralis-text-white dark:astralis-bg-gray-100 dark:astralis-text-gray-900 astralis-border-transparent";
    }
    if (c === "primary") {
      return "astralis-bg-primary-600 astralis-text-white astralis-border-transparent";
    }
    if (c === "success" || c === "green") {
      return "astralis-bg-green-600 astralis-text-white astralis-border-transparent";
    }
    if (c === "warning" || c === "yellow") {
      return "astralis-bg-yellow-500 astralis-text-yellow-950 astralis-border-transparent";
    }
    if (c === "danger" || c === "red") {
      return "astralis-bg-red-600 astralis-text-white astralis-border-transparent";
    }
    return `astralis-bg-${c}-600 astralis-text-white astralis-border-transparent`;
  }

  if (variant === "outline") {
    if (isNeutral) {
      return "astralis-bg-transparent astralis-text-gray-700 dark:astralis-text-gray-300 astralis-border-gray-300 dark:astralis-border-gray-600";
    }
    if (c === "primary") {
      return "astralis-bg-transparent astralis-text-primary-700 dark:astralis-text-primary-300 astralis-border-primary-500";
    }
    if (c === "success" || c === "green") {
      return "astralis-bg-transparent astralis-text-green-700 dark:astralis-text-green-300 astralis-border-green-500";
    }
    if (c === "warning" || c === "yellow") {
      return "astralis-bg-transparent astralis-text-yellow-700 dark:astralis-text-yellow-300 astralis-border-yellow-500";
    }
    if (c === "danger" || c === "red") {
      return "astralis-bg-transparent astralis-text-red-700 dark:astralis-text-red-300 astralis-border-red-500";
    }
    return `astralis-bg-transparent astralis-text-${c}-700 dark:astralis-text-${c}-300 astralis-border-${c}-500`;
  }

  if (isNeutral) {
    return "astralis-bg-gray-100 astralis-text-gray-700 dark:astralis-bg-gray-800 dark:astralis-text-gray-300 astralis-border-transparent";
  }
  if (c === "primary") {
    return "astralis-bg-primary-100 astralis-text-primary-800 dark:astralis-bg-primary-900/40 dark:astralis-text-primary-300 astralis-border-transparent";
  }
  if (c === "success" || c === "green") {
    return "astralis-bg-green-100 astralis-text-green-800 dark:astralis-bg-green-900/40 dark:astralis-text-green-300 astralis-border-transparent";
  }
  if (c === "warning" || c === "yellow") {
    return "astralis-bg-yellow-100 astralis-text-yellow-800 dark:astralis-bg-yellow-900/40 dark:astralis-text-yellow-300 astralis-border-transparent";
  }
  if (c === "danger" || c === "red") {
    return "astralis-bg-red-100 astralis-text-red-800 dark:astralis-bg-red-900/40 dark:astralis-text-red-300 astralis-border-transparent";
  }

  return `astralis-bg-${c}-100 astralis-text-${c}-800 dark:astralis-bg-${c}-900/40 dark:astralis-text-${c}-300 astralis-border-transparent`;
}
