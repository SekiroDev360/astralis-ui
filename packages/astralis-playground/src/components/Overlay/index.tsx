import { Accordion, Text } from "astralis-ui";
import ModalShowcase from "./Modal";
import DrawerShowcase from "./Drawer";
import PopoverShowcase from "./Popover";
import TooltipShowcase from "./Tooltip";

const OverlayShowcase = () => {
  const accordionItems = [
    { title: "Modal", content: <ModalShowcase /> },
    { title: "Drawer", content: <DrawerShowcase /> },
    { title: "Popover", content: <PopoverShowcase /> },
    { title: "Tooltip", content: <TooltipShowcase /> },
  ];

  return (
    <div>
      <Text element="h2" weight="bold" className="mb-5">
        Overlay Components
      </Text>

      <Accordion type="multiple" defaultValue={"Modal"}>
        {accordionItems.map((item) => (
          <Accordion.Item key={item.title} value={item.title}>
            <Accordion.Trigger>
              {item.title}
              <Accordion.Indicator />
            </Accordion.Trigger>

            <Accordion.Content>
              {item.content}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default OverlayShowcase;
