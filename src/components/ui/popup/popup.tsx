import * as React from "react";
import { Popover } from "@base-ui-components/react/popover";
import { Eye } from "lucide-react";

export default function ImagePopover({ src }: { src: string }) {
  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label="View image"
        className="hover:text-blue-500 transition-colors"
      >
        <Eye className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 max-w-md">
            <Popover.Arrow className="fill-gray-200 dark:fill-gray-700" />
            <div className="flex flex-col items-center">
              <img
                src={src}
                alt="Preview"
                className="rounded-lg object-contain max-h-[70vh] max-w-full"
              />
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
