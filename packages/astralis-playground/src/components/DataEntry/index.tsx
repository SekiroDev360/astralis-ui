import { Accordion, Text } from "astralis-ui";
import InputShowcase from "./InputShowcase";
import SelectShowcase from "./SelectShowcase";
import CheckboxRadioSwitchShowcase from "./CheckboxRadioSwitchShowcase";
import PinInputShowcase from "./PinInputShowcase";
import SliderShowcase from "./SliderShowcase";

const DataEntryShowcase = () => {
  const accordionItems = [
    { title: "Input & Textarea", content: <InputShowcase /> },
    { title: "Select & MultiSelect", content: <SelectShowcase /> },
    { title: "Checkbox, Radio & Switch", content: <CheckboxRadioSwitchShowcase /> },
    { title: "Pin Input", content: <PinInputShowcase /> },
    { title: "Slider & RangeSlider", content: <SliderShowcase /> },
  ];

  return (
    <div>
      <Text element="h2" weight="bold" className="mb-5">
        Data Entry
      </Text>

      <Accordion type="multiple" defaultValue={"Input & Textarea"}>
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

export default DataEntryShowcase;
