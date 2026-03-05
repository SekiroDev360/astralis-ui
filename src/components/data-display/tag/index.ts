import { Tag as TagRoot, CheckableTag, CheckableTagGroup } from "./tag";

/* Compound API */
export const Tag = Object.assign(TagRoot, {
  Checkable: CheckableTag,
  Group: CheckableTagGroup,
});

export { TagRoot as TagBase, CheckableTag, CheckableTagGroup };
export default Tag;

/* Types */
export type {
  TagSize,
  TagVariant,
  TagColorScheme,
  TagProps,
  CheckableTagProps,
  CheckableTagGroupProps,
  TagOption,
} from "./tag.types";
