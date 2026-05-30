import { AspectRatio, Text } from "astralis-ui";

export default function AspectRatioShowcase() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">AspectRatio Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Maintains consistent proportions for embedded videos, maps, and images, ensuring perfect framing during responsive resizing.
        </p>
      </div>

      {/* Grid of Common Ratios */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Standard Aspect Ratios
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          
          {/* Square 1:1 */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-center">Square (1:1)</span>
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              <AspectRatio ratio={1}>
                <div className="w-full h-full bg-indigo-50 dark:bg-indigo-950/20 flex flex-col items-center justify-center p-3 text-center">
                  <Text weight="bold" className="text-indigo-600 dark:text-indigo-400">1:1</Text>
                  <Text size="sm" className="text-zinc-400 dark:text-zinc-500 mt-1">Avatars & Icons</Text>
                </div>
              </AspectRatio>
            </div>
          </div>

          {/* Classic Portrait 4:3 */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-center">Classic (4:3)</span>
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              <AspectRatio ratio={4/3}>
                <div className="w-full h-full bg-green-50 dark:bg-green-950/20 flex flex-col items-center justify-center p-3 text-center">
                  <Text weight="bold" className="text-green-600 dark:text-green-400">4:3</Text>
                  <Text size="sm" className="text-zinc-400 dark:text-zinc-500 mt-1">Photos & Cards</Text>
                </div>
              </AspectRatio>
            </div>
          </div>

          {/* Video Standard 16:9 */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-center">Widescreen (16:9)</span>
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              <AspectRatio ratio={16/9}>
                <div className="w-full h-full bg-orange-50 dark:bg-orange-950/20 flex flex-col items-center justify-center p-3 text-center">
                  <Text weight="bold" className="text-orange-600 dark:text-orange-400">16:9</Text>
                  <Text size="sm" className="text-zinc-400 dark:text-zinc-500 mt-1">Videos & Slides</Text>
                </div>
              </AspectRatio>
            </div>
          </div>

          {/* Cinematic 21:9 */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-center">UltraWide (21:9)</span>
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              <AspectRatio ratio={21/9}>
                <div className="w-full h-full bg-purple-50 dark:bg-purple-950/20 flex flex-col items-center justify-center p-3 text-center">
                  <Text weight="bold" className="text-purple-600 dark:text-purple-400">21:9</Text>
                  <Text size="sm" className="text-zinc-400 dark:text-zinc-500 mt-1">Panoramas</Text>
                </div>
              </AspectRatio>
            </div>
          </div>

        </div>
      </div>

      {/* Video & Map Embed Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Interactive Responsive Video */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Interactive Video Frame (16:9)
          </h4>
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-lg bg-zinc-950">
            <AspectRatio ratio={16/9}>
              <iframe
                title="Widescreen video preview"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </AspectRatio>
          </div>
        </div>

        {/* Dynamic Location Map */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Responsive Map Embed (16:9)
          </h4>
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-lg bg-zinc-950">
            <AspectRatio ratio={16/9}>
              <iframe
                title="Embedded maps preview"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d-0.127758!3d51.507351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c3236bbd79%3A0xc3b839ec9b7754d9!2sBig%20Ben!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk"
                className="w-full h-full border-0 grayscale dark:invert-[0.9] dark:hue-rotate-180"
                allowFullScreen
                loading="lazy"
              />
            </AspectRatio>
          </div>
        </div>

      </div>

    </div>
  );
}
