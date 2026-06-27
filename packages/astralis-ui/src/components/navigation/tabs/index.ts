import { TabsRoot } from "./components/tabs-root";
import { TabsList } from "./components/tabs-list";
import { TabsTrigger } from "./components/tabs-trigger";
import { TabsContent } from "./components/tabs-content";

/* 1️⃣ Compound DX API */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

/* 2️⃣ Flat exports for tree-shaking (sub-parts only — the root is `Tabs` itself) */
export { TabsList, TabsTrigger, TabsContent };

export default Tabs;

export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from "./tabs.types";
export type {
  TabsOrientation,
  TabsVariant,
  TabsSize,
  TabsActivationMode,
} from "./tabs.context";
