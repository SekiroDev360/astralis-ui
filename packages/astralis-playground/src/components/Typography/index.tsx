import { Accordion, Text } from "astralis-ui";
import TextShowcase from "./Text";
import HighlightShowcase from "./Highlight";
import CodeShowcase from "./Code";
import BlockquoteShowcase from "./Blockquote";

const TypographyShowcase = () => {
  const accordionItems = [
    { title: "Text", content: <TextShowcase /> },
    { title: "Highlight", content: <HighlightShowcase /> },
    { title: "Code", content: <CodeShowcase /> },
    { title: "Blockquote", content: <BlockquoteShowcase /> },
  ];

  return (
    <div>
      <Text element="h2" weight="bold" className="mb-5">
        Typography & Wording
      </Text>

      <Accordion type="multiple" defaultValue={"Text"}>
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

export default TypographyShowcase;
