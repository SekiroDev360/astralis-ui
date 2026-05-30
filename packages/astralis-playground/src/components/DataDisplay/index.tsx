import { Accordion, Text } from "astralis-ui";
import AvatarShowcase from "./Avatar";
import BadgeShowcase from "./Badge";
import TagShowcase from "./Tag";
import TimelineShowcase from "./Timeline";
import StatShowcase from "./Stat";
import DataListShowcase from "./DataList";
import CardShowcase from "./Card";
import MarqueeShowcase from "./Marquee";
import QrCodeShowcase from "./QrCode";
import TableShowcase from "./Table";
import CalendarShowcase from "./Calendar";
import ImageShowcase from "./Image";

const DataDisplayShowcase = () => {
  const accordionItems = [
    { title: "Avatar", content: <AvatarShowcase /> },
    { title: "Badge", content: <BadgeShowcase /> },
    { title: "Tag", content: <TagShowcase /> },
    { title: "Timeline", content: <TimelineShowcase /> },
    { title: "Stat", content: <StatShowcase /> },
    { title: "Data List", content: <DataListShowcase /> },
    { title: "Card", content: <CardShowcase /> },
    { title: "Marquee", content: <MarqueeShowcase /> },
    { title: "QR Code", content: <QrCodeShowcase /> },
    { title: "Table", content: <TableShowcase /> },
    { title: "Calendar", content: <CalendarShowcase /> },
    { title: "Image", content: <ImageShowcase /> },
  ];

  return (
    <div>
      <Text element="h2" weight="bold" className="mb-5">
        Data Display
      </Text>

      <Accordion type="multiple" defaultValue={"Avatar"}>
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

export default DataDisplayShowcase;
