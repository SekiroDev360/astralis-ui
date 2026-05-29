import { ImageGroup } from "./components/image-group";
import { ImageRoot } from "./components/image-root";

export const Image = Object.assign(ImageRoot, {
  Group: ImageGroup,
});

export { ImageRoot, ImageGroup };
export default Image;

export type {
  ImageProps,
  ImageGroupProps,
  ImageGroupItem,
  ImageObjectFit,
  ImageRounded,
  ImageAspectRatio,
} from "./image.types";
