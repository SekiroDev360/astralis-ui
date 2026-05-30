import { Accordion, Text } from "astralis-ui";
import CarouselShowcase from "./Carousel";
import PaginationShowcase from "./Pagination";
import AccordionShowcase from "./Accordion";

const DisclosureShowcase = () => {
  const accordionItems = [
    { title: "Accordion", content: <AccordionShowcase /> },
    { title: "Carousel", content: <CarouselShowcase /> },
    { title: "Pagination", content: <PaginationShowcase /> },
  ];

  return (
    <div>
      <Text element="h2" weight="bold" className="mb-5">
        Disclosure
      </Text>

      <Accordion type="multiple" defaultValue={"Accordion"}>
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

export default DisclosureShowcase;
