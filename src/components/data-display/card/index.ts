import { CardBody } from "./components/card-body";
import { CardDescription } from "./components/card-description";
import { CardFooter } from "./components/card-footer";
import { CardHeader } from "./components/card-header";
import { CardRoot } from "./components/card-root";
import { CardTitle } from "./components/card-title";

export const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});

export {
  CardRoot,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
};

export type {
  CardSize,
  CardVariant,
  CardRootProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardBodyProps,
  CardFooterProps,
} from "./card.types";
