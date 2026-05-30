import { Accordion, Text } from "astralis-ui";
import IconShowcase from "./IconShowcase";

const IconCategoryShowcase = () => {
  const accordionItems = [{ title: "Icon", content: <IconShowcase /> }];

  return (
    <div>
      <Text element="h2" weight="bold" className="mb-5">
        Core Components
      </Text>

      <Accordion type="multiple" defaultValue={"Icon"}>
        {accordionItems.map((item) => (
          <Accordion.Item key={item.title} value={item.title}>
            <Accordion.Trigger value={item.title}>
              {item.title}
              <Accordion.Indicator value={item.title} />
            </Accordion.Trigger>

            <Accordion.Conten value={item.title}>
              {item.content}
            </Accordion.Conten>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default IconCategoryShowcase;
