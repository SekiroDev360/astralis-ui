import { Accordion, Text } from "astralis-ui";
import StepsShowcase from "./Steps";
import TabsShowcase from "./Tabs";

const NavigationShowcase = () => {
  const accordionItems = [
    { title: "Steps", content: <StepsShowcase /> },
    { title: "Tabs", content: <TabsShowcase /> },
  ];

  return (
    <div>
      <Text element="h2" weight="bold" className="mb-5">
        Navigation
      </Text>

      <Accordion type="multiple" defaultValue={"Steps"}>
        {accordionItems?.map((item) => (
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

export default NavigationShowcase;
