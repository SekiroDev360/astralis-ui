import { Accordion, Text } from "astralis-ui";
import BoxShowcase from "./Box";
import StackShowcase from "./Stack";
import GridShowcase from "./Grid";
import ContainerShowcase from "./Container";
import AspectRatioShowcase from "./AspectRatio";
import DividerShowcase from "./Divider";

const LayoutShowcase = () => {
  const accordionItems = [
    { title: "Box", content: <BoxShowcase /> },
    { title: "Stack", content: <StackShowcase /> },
    { title: "Grid", content: <GridShowcase /> },
    { title: "Container", content: <ContainerShowcase /> },
    { title: "Aspect Ratio", content: <AspectRatioShowcase /> },
    { title: "Divider", content: <DividerShowcase /> },
  ];

  return (
    <div>
      <Text element="h2" weight="bold" className="mb-5">
        Layout
      </Text>

      <Accordion type="multiple" defaultValue={"Box"}>
        {accordionItems.map((item) => (
          <Accordion.Item key={item.title} value={item.title}>
            <Accordion.Trigger value={item.title}>
              {item.title}
              <Accordion.Indicator value={item.title} />
            </Accordion.Trigger>

            <Accordion.Content value={item.title}>
              {item.content}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default LayoutShowcase;
