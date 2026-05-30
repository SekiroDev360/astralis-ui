import { TabsRoot } from "./components/tabs-root";
import { TabsList } from "./components/tabs-list";
import { TabsTrigger } from "./components/tabs-trigger";
import { TabsContent } from "./components/tabs-content";

/* 1️⃣ Compound API */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

/* 2️⃣ Flat exports */
export {
  TabsList,
  TabsTrigger,
  TabsContent,
};

/* 3️⃣ Types */
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from "./tabs.types";
