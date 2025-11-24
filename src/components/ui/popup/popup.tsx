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
        <Popover.Positioner
          side="right"
          sideOffset={40}
          align="start"
          alignOffset={40}
          className="z-0"
        >
          <Popover.Popup className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 max-w-md">
            <Popover.Arrow className="fill-gray-200 dark:fill-gray-700" />
            <div className="relative overflow-hidden rounded-lg max-h-[35vh] max-w-[250px] cursor-zoom-in">
              <img
                src={src}
                alt="Preview"
                className="object-contain w-full h-full transition-transform duration-200"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
                  e.currentTarget.style.transform = "scale(2.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
