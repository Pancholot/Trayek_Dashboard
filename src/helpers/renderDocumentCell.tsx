import { Check, X } from "lucide-react";
import ImagePopover from "../components/ui/popup/popup";

export function renderDocumentStatus(value: string, exists: boolean) {
  if (!exists) return <X className="text-red-500 w-5 h-5" />;

  return (
    <div className="flex items-center justify-center gap-2">
      <Check className="text-green-500 w-5 h-5" />
      <ImagePopover src={value} />
    </div>
  );
}
