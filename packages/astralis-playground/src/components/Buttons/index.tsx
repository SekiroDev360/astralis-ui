import { Accordion, Text } from "astralis-ui";
import ButtonShowcase from "./Button";

const ButtonsShowcase = () => {
  const accordionItems = [
    { title: "Button", content: <ButtonShowcase /> },
  ];

  return (
    <div>
      <Text element="h2" weight="bold" className="mb-5">
        Buttons & Triggers
      </Text>

      <Accordion type="multiple" defaultValue={"Button"}>
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

export default ButtonsShowcase;
