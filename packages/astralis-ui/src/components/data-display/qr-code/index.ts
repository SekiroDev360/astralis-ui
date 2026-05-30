import { QrCodeRoot } from "./qr-code";

/* Compound API */
export const QrCode = Object.assign(QrCodeRoot, {});

export { QrCodeRoot };
export default QrCode;

/* Types */
export type {
  QrCodeSize,
  QrCodeErrorLevel,
  QrCodeStatus,
  QrCodeRootProps,
} from "./qr-code.types";
