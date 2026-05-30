import type { Meta, StoryObj } from "@storybook/react-vite";
import { Carousel } from "./index";

const meta: Meta<typeof Carousel> = {
  title: "Components/Disclosure/Carousel",
  component: Carousel,
};
export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <Carousel>
      <Carousel.Track>
        <Carousel.Slide>
          <div className="astralis-h-40 astralis-bg-gray-200 astralis-flex astralis-items-center astralis-justify-center">
            Slide 1
          </div>
        </Carousel.Slide>

        <Carousel.Slide>
          <div className="astralis-h-40 astralis-bg-gray-300 astralis-flex astralis-items-center astralis-justify-center">
            Slide 2
          </div>
        </Carousel.Slide>

        <Carousel.Slide>
          <div className="astralis-h-40 astralis-bg-gray-400 astralis-flex astralis-items-center astralis-justify-center">
            Slide 3
          </div>
        </Carousel.Slide>
      </Carousel.Track>

      <Carousel.Prev />
      <Carousel.Next />

      <div className="astralis-flex astralis-justify-center astralis-gap-2 astralis-mt-3">
        <Carousel.Indicator index={0} />
        <Carousel.Indicator index={1} />
        <Carousel.Indicator index={2} />
      </div>
    </Carousel>
  ),
};
