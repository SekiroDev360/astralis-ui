import { CheckableTag } from "./components/checkable-tag";
import { CheckableTagGroup } from "./components/checkable-tag-group";
import { TagRoot } from "./components/tag-root";

export const Tag = Object.assign(TagRoot, {
  Checkable: CheckableTag,
  Group: CheckableTagGroup,
});

export { TagRoot, CheckableTag, CheckableTagGroup };

export type {
  TagSize,
  TagVariant,
  TagColorScheme,
  TagProps,
  CheckableTagProps,
  CheckableTagGroupProps,
  TagOption,
} from "./tag.types";
