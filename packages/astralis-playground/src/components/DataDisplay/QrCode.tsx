import { useState } from "react";
import { QrCode, Text, Button, Tag } from "astralis-ui";

export default function QrCodeShowcase() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [qrStatus, setQrStatus] = useState<"active" | "loading" | "expired" | "scanned">("active");

  const handleRefresh = () => {
    setQrStatus("loading");
    setTimeout(() => {
      setRefreshKey((prev) => prev + 1);
      setQrStatus("active");
    }, 1200);
  };

  const centerOverlayLogo = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-primary-500">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">QrCode Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          A premium SVG vector QR generator component supporting sizes, logo center branding, interactive status overlays, and downloadable exports.
        </p>
      </div>

      {/* Control Status Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Status Mock Tests</span>
          <span className="text-xs text-zinc-400 font-medium">Toggle overlay states to test canvas masks.</span>
        </div>
        <div className="flex gap-2">
          {(["active", "loading", "expired", "scanned"] as const).map((st) => (
            <Button
              key={st}
              size="xs"
              variant={qrStatus === st ? "primary" : "outline"}
              onClick={() => setQrStatus(st)}
            >
              {st.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid of sizes and custom templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Sizes and Downloading */}
        <div className="flex flex-col gap-6 p-6 border border-zinc-150 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/20 rounded-xl items-center">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wide self-start">
            Interactive States & Sizes
          </h4>
          <div className="flex flex-col items-center gap-4 py-4 min-h-[300px] justify-center">
            <QrCode
              key={refreshKey}
              value="https://astralis-ui.com/showcase/qrcode"
              size="lg"
              status={qrStatus}
              onRefresh={handleRefresh}
              downloadable
              downloadFileName="astralis_qrcode_sample"
            />
            <div className="flex flex-col items-center mt-2">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold uppercase">Active URL Endpoint</span>
              <span className="text-xs text-green-600 dark:text-green-400 font-bold">astralis-ui.com/showcase/qrcode</span>
            </div>
          </div>
        </div>

        {/* Custom Branding & Colored Templates */}
        <div className="flex flex-col gap-6 p-6 border border-zinc-150 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-950/20 rounded-xl">
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 uppercase tracking-wide">
            Overlay Center Branding & Custom Shading
          </h4>
          
          <div className="flex flex-col gap-6 py-2">
            
            {/* Center Logo branding */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <QrCode
                value="https://github.com/astralis-ui/core"
                size="md"
                overlay={centerOverlayLogo}
                overlaySize={22}
              />
              <div className="flex flex-col gap-1 flex-1">
                <Tag colorScheme="blue" className="self-start mb-1">Center Overlay</Tag>
                <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Shield Icon Center Brand</h5>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Injects any React Node or SVG image directly inside the center grid, automatically offsetting elements to preserve scanner readability.
                </p>
              </div>
            </div>

            {/* Custom Hex Color Branding */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <QrCode
                value="https://astralis-ui.com/docs"
                size="md"
                color="#15803d" // Custom Green foreground color
                bgColor="transparent"
              />
              <div className="flex flex-col gap-1 flex-1">
                <Tag colorScheme="green" className="self-start mb-1">Custom Colors</Tag>
                <h5 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Forest Green Foreground</h5>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Supports custom foreground strings (hex/rgb codes) to match specific merchant portal dashboards.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
