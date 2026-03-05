import {
  CardRoot,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
} from "./card";

/* Compound API */
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
export default Card;

/* Types */
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
