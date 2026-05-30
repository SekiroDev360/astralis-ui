import { Image, Text, Card, Tag } from "astralis-ui";

export default function ImageShowcase() {
  const imagesList = [
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60", alt: "Yosemite Valley Mountains", caption: "Yosemite National Valley, USA" },
    { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60", alt: "Forest Mist Sunrise", caption: "Mist sunrise over green forest hills" },
    { src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=60", alt: "Desert Saguaro Cacti", caption: "Sonoran desert cacti field" },
    { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop&q=60", alt: "Chicago City Skyline", caption: "Downtown Chicago City Skyline, USA" },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Image Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          A premium image component supporting lazy loading, aspect ratio boxes, fallback error layouts, figcaption text, and high-fidelity click-to-preview lightbox zoom galleries.
        </p>
      </div>

      {/* Grid of basic parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Click to Preview Lightbox */}
        <div className="flex flex-col gap-4 p-6 border border-zinc-150 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/20 rounded-xl items-center">
          <div className="w-full flex justify-between items-baseline mb-1">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wide">
              Click-to-Preview Lightbox
            </h4>
            <Tag colorScheme="blue">Interactive Preview</Tag>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60"
            alt="Yosemite National Valley"
            preview={true}
            rounded="xl"
            caption="Click this image to open the lightbox gallery (zoom, rotate, and close)."
            className="shadow-md border border-zinc-200 dark:border-zinc-700"
          />
        </div>

        {/* Failed Loading Fallbacks */}
        <div className="flex flex-col gap-4 p-6 border border-zinc-150 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/20 rounded-xl h-full justify-between">
          <div className="w-full flex justify-between items-baseline mb-1">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wide">
              Failed Load Fallbacks
            </h4>
            <Tag colorScheme="danger">Error Fallbacks</Tag>
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            <Image
              src="https://invalid-domain.xyz/nonexistent-image.jpg"
              alt="Invalid Broken Image Url"
              rounded="xl"
              width="100%"
              height={180}
              fallback={
                <div className="flex flex-col items-center justify-center gap-2 w-full h-[180px] bg-red-500/10 border border-dashed border-red-500 rounded-xl text-red-500 p-4 text-center">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-8 h-8">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                  </svg>
                  <Text weight="bold" size="sm">Image Loading Failed</Text>
                  <span className="text-[10px] text-zinc-400 font-medium">Custom fallback UI matches the system dashboard styling</span>
                </div>
              }
            />
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
            Provides standard error handling, seamlessly swapping failed src nodes with styled custom React fallback elements.
          </p>
        </div>

      </div>

      {/* Aspect Ratio Box Matrix */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Preset Aspect Ratio Boxes
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-zinc-400">Square (1/1)</span>
            <Image
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60"
              alt="Yosemite"
              aspectRatio="square"
              rounded="md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-zinc-400">Video (16/9)</span>
            <Image
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60"
              alt="Yosemite"
              aspectRatio="video"
              rounded="md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-zinc-400">Portrait (3/4)</span>
            <Image
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60"
              alt="Yosemite"
              aspectRatio="portrait"
              rounded="md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold text-zinc-400">Wide (21/9)</span>
            <Image
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60"
              alt="Yosemite"
              aspectRatio="wide"
              rounded="md"
            />
          </div>

        </div>
      </div>

      {/* Album Collection / ImageGroup */}
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Seamless Photo Album (ImageGroup)
        </h4>
        <div className="p-6 border border-zinc-150 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/20 rounded-xl flex flex-col gap-4">
          <Image.Group
            items={imagesList}
            columns={4}
            gap="md"
            rounded="lg"
            objectFit="cover"
          />
          <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium leading-relaxed">
            Click any album picture above to launch the integrated lightbox group controller. Supports keyboard key commands (<strong>ArrowLeft / ArrowRight</strong>) to flip images backward and forward or (<strong>Escape</strong>) to exit.
          </p>
        </div>
      </div>

    </div>
  );
}
