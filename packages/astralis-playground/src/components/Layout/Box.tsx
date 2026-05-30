import { Box, Text } from "astralis-ui";

export default function BoxShowcase() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Box Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          The fundamental layout building block. By default, it renders a semantic <code>&lt;div&gt;</code>, but can be polymorphic using the <code>as</code> prop.
        </p>
      </div>

      {/* Polymorphic Rendering Section */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Polymorphic Element Rendering
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <Box as="section" className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <Text weight="bold" size="sm" className="mb-1 text-zinc-900 dark:text-zinc-50">Rendered as &lt;section&gt;</Text>
            <Text size="sm" className="text-zinc-500 dark:text-zinc-400">
              This block is compiled as a semantic HTML5 <code>&lt;section&gt;</code> element. Inspect it in your browser developer tools to verify.
            </Text>
          </Box>

          <Box as="article" className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <Text weight="bold" size="sm" className="mb-1 text-zinc-900 dark:text-zinc-50">Rendered as &lt;article&gt;</Text>
            <Text size="sm" className="text-zinc-500 dark:text-zinc-400">
              Ideal for independent, self-contained contents like blog posts, news articles, or custom user feed items.
            </Text>
          </Box>

          <Box as="header" className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <Text weight="bold" size="sm" className="mb-1 text-zinc-900 dark:text-zinc-50">Rendered as &lt;header&gt;</Text>
            <Text size="sm" className="text-zinc-500 dark:text-zinc-400">
              Ideal for header banners, top navigation panels, or sectional introductory title blocks.
            </Text>
          </Box>

          <Box as="footer" className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <Text weight="bold" size="sm" className="mb-1 text-zinc-900 dark:text-zinc-50">Rendered as &lt;footer&gt;</Text>
            <Text size="sm" className="text-zinc-500 dark:text-zinc-400">
              Provides descriptive closing containers containing copyright declarations, authors, and directory site mapping.
            </Text>
          </Box>

        </div>
      </div>

      {/* Styled Box Wrappers */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Visual Depth & Border Accents
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <Box className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-lg hover:shadow-md transition-shadow">
            <Text weight="semibold" size="sm" className="mb-1 text-zinc-900 dark:text-zinc-50">Shadow Sm</Text>
            <Text size="xs" className="text-zinc-400 dark:text-zinc-500">
              Subtle elevation depth perfect for simple grid items and list panels.
            </Text>
          </Box>

          <Box className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <Text weight="semibold" size="sm" className="mb-1 text-zinc-900 dark:text-zinc-50">Shadow Md</Text>
            <Text size="xs" className="text-zinc-400 dark:text-zinc-500">
              Medium shadow layer matching standard modal containers and product cards.
            </Text>
          </Box>

          <Box className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <Text weight="semibold" size="sm" className="mb-1 text-zinc-900 dark:text-zinc-50">Shadow Lg</Text>
            <Text size="xs" className="text-zinc-400 dark:text-zinc-500">
              High elevated shadow mapping designed for overlay displays and dropdown boards.
            </Text>
          </Box>

        </div>
      </div>

    </div>
  );
}
