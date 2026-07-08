"use client";

import { Button, Kbd, Menu, toast, Toaster } from "astralis-ui";
import { Copy, Pencil, Settings, Trash2 } from "lucide-react";

export function MenuDemo() {
  const did = (what: string) => toast.info(what);

  return (
    <>
      <Toaster />
      <Menu>
        <Menu.Trigger>
          <Button variant="outline" colorScheme="gray">Actions</Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Label>Mission</Menu.Label>
          <Menu.Item icon={<Pencil className="astralis:size-full" />} shortcut={<Kbd size="sm">E</Kbd>} onSelect={() => did("Edit")}>
            Edit
          </Menu.Item>
          <Menu.Item icon={<Copy className="astralis:size-full" />} shortcut={<Kbd size="sm">⌘C</Kbd>} onSelect={() => did("Duplicate")}>
            Duplicate
          </Menu.Item>
          <Menu.Item icon={<Settings className="astralis:size-full" />} disabled>
            Configure
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item danger icon={<Trash2 className="astralis:size-full" />} onSelect={() => did("Deleted")}>
            Delete
          </Menu.Item>
        </Menu.Content>
      </Menu>
    </>
  );
}
