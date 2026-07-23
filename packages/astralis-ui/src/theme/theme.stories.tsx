// src/theme/theme.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AstralisProvider } from "./provider";
import { useTheme } from "./theme-context";
import { Button } from "../components/buttons/button";
import { Box } from "../components/layout/box";
import { Grid } from "../components/layout/grid";
import { HStack, VStack } from "../components/layout/stack";
import { Text } from "../components/typography/text";
import { Heading } from "../components/typography/heading";

/** A single labelled swatch used across the palette demos. */
function Swatch({ bg, label }: { bg: string; label: string }) {
  return (
    <VStack gap="1">
      <Box bg={bg as never} h="12" rounded="lg" border="normal" borderColor="subtle" />
      <Text size="xs" color="muted" align="center">{label}</Text>
    </VStack>
  );
}

/** A titled section card wrapping each token group. */
function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Box bg="panel" border="normal" borderColor="subtle" rounded="xl" p="6" shadow="sm">
      <Heading as="h3" size="lg" weight="semibold" color="base">{title}</Heading>
      <Text size="sm" color="muted">{description}</Text>
      <Box pt="4">{children}</Box>
    </Box>
  );
}

const ThemeDemo = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <Box bg="base" p="8">
      <VStack gap="8" alignItems="stretch">
        {/* Theme Controls */}
        <Section title="Theme Controls" description="Toggle between light, dark, and system themes.">
          <VStack gap="6" alignItems="stretch">
            <HStack gap="3">
              <Button variant={theme === "light" ? "solid" : "outline"} onClick={() => setTheme("light")} size="sm">
                Light
              </Button>
              <Button variant={theme === "dark" ? "solid" : "outline"} onClick={() => setTheme("dark")} size="sm">
                Dark
              </Button>
              <Button variant={theme === "system" ? "solid" : "outline"} onClick={() => setTheme("system")} size="sm">
                System
              </Button>
            </HStack>
            <Box bg="muted" border="normal" borderColor="subtle" rounded="lg" p="4">
              <Text size="sm" color="muted">
                Selected: <Text as="span" weight="semibold" color="base">{theme}</Text>
                {"  ·  "}
                Resolved: <Text as="span" weight="semibold" color="base">{resolvedTheme}</Text>
              </Text>
            </Box>
          </VStack>
        </Section>

        {/* Brand Palette */}
        <Section title="Brand Palette" description="Brand scale — raw palette tokens.">
          <Grid columns="5" gap="2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
              <Swatch key={shade} bg={`brand-${shade}`} label={String(shade)} />
            ))}
          </Grid>
        </Section>

        {/* Semantic Surfaces */}
        <Section title="Semantic Surfaces" description="These automatically adapt to light and dark mode.">
          <Grid columns="2" gap="3">
            {(["base", "muted", "subtle", "panel", "emphasized", "inverted"] as const).map((surface) => (
              <Box key={surface} bg={surface} border="normal" borderColor="subtle" rounded="lg" p="4">
                <Text size="sm" weight="medium" color={surface === "inverted" ? "inverted" : "base"}>
                  surface-{surface}
                </Text>
                <Text size="xs" color={surface === "inverted" ? "inverted" : "muted"}>bg-surface-{surface}</Text>
              </Box>
            ))}
          </Grid>
        </Section>

        {/* Semantic Content */}
        <Section title="Semantic Content" description="Text color tokens that flip automatically.">
          <VStack gap="3" alignItems="stretch">
            <Text size="md" weight="medium" color="base">label-base — Main headings and body</Text>
            <Text size="md" color="muted">label-muted — Supporting text and labels</Text>
            <Text size="md" color="subtle">label-subtle — Placeholders and hints</Text>
            <Box bg="inverted" rounded="lg" p="3" display="inline-block">
              <Text size="md" weight="medium" color="inverted">label-inverted — Text on inverted surfaces</Text>
            </Box>
          </VStack>
        </Section>

        {/* Status Colors */}
        <Section title="Status Colors" description="Semantic status — success, warning, error.">
          <Grid columns="3" gap="3">
            <Box bg="success" border="normal" borderColor="success" rounded="lg" p="4">
              <Text size="sm" weight="semibold" color="success">Success</Text>
              <Text size="xs" color="success">Operation completed</Text>
            </Box>
            <Box bg="warning" border="normal" borderColor="warning" rounded="lg" p="4">
              <Text size="sm" weight="semibold" color="warning">Warning</Text>
              <Text size="xs" color="warning">Needs attention</Text>
            </Box>
            <Box bg="error" border="normal" borderColor="error" rounded="lg" p="4">
              <Text size="sm" weight="semibold" color="error">Error</Text>
              <Text size="xs" color="error">Something went wrong</Text>
            </Box>
          </Grid>
        </Section>

        {/* Token Override */}
        <Section title="Token Override" description="Consumers can override the brand color via the tokens prop on AstralisProvider.">
          <AstralisProvider tokens={{ brandColor: "#e11d48" }}>
            <HStack gap="3">
              <Button variant="solid" size="sm">Overridden Brand</Button>
              <Button variant="outline" size="sm">Outline</Button>
            </HStack>
          </AstralisProvider>
        </Section>
      </VStack>
    </Box>
  );
};

const meta: Meta<typeof ThemeDemo> = {
  title: "Theme/Theme Demo",
  component: ThemeDemo,
  decorators: [
    (Story) => (
      <AstralisProvider>
        <Story />
      </AstralisProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Interactive theme demo showcasing the Astralis design token system — brand palette, semantic surfaces, content tokens, and runtime overrides.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeDemo>;

export const Default: Story = {};

export const ForcedLight: Story = {
  decorators: [
    (Story) => (
      <AstralisProvider defaultTheme="light">
        <Story />
      </AstralisProvider>
    ),
  ],
};

export const ForcedDark: Story = {
  decorators: [
    (Story) => (
      <AstralisProvider defaultTheme="dark">
        <Story />
      </AstralisProvider>
    ),
  ],
};
