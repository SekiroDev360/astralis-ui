/**
 * Splits a props bag into buckets by key ownership — the shared replacement
 * for the hand-rolled `for (const key in props)` loops that Box-composing
 * components (Code, Blockquote, CodeBlock, List, …) each repeated.
 *
 * Keys are claimed by the FIRST group that contains them; anything unclaimed
 * falls through to the trailing HTML-props bucket. Because the groups are
 * derived from the same variant maps that define the styles
 * (`Object.keys(variantMap)`), a new style prop can never leak onto the DOM
 * element as an invalid attribute.
 *
 *   const [variantProps, boxProps, htmlProps] =
 *     splitVariantProps(props, VARIANT_KEYS, BOX_VARIANT_KEYS);
 */
export function splitVariantProps(
  props: Record<string, unknown>,
  ...keyGroups: ReadonlyArray<readonly string[]>
): Record<string, unknown>[] {
  const sets = keyGroups.map((group) => new Set(group));
  const buckets = keyGroups.map(() => ({}) as Record<string, unknown>);
  const htmlProps: Record<string, unknown> = {};

  for (const key in props) {
    if (!Object.prototype.hasOwnProperty.call(props, key)) continue;
    const owner = sets.findIndex((set) => set.has(key));
    (owner === -1 ? htmlProps : buckets[owner])[key] = props[key];
  }

  return [...buckets, htmlProps];
}
