import { Check, X, Minus } from "lucide-react";
import ImagePopover from "../components/ui/popup/popup";

export interface DocumentStatusCellProps {
  src: string;
  status: "missing" | "pending" | "approved";
  exists: boolean;
  setStatus: (s: "pending" | "approved" | "missing") => void;
}

export default function DocumentStatusCell({
  src,
  status,
  exists,
  setStatus,
}: DocumentStatusCellProps) {
  if (!exists || status === "missing") {
    return <X className="text-red-500 w-6 h-6" />;
  }

  if (status === "pending") {
    return (
      <button onClick={() => setStatus("approved")}>
        <Minus className="text-orange-500 w-6 h-6" />
      </button>
    );
  }

  if (status === "approved") {
    return (
      <div className="flex items-center gap-2">
        {/* Palomita clickable */}
        <button onClick={() => setStatus("pending")}>
          <Check className="text-green-500 w-6 h-6" />
        </button>

        {/* Ojo que sí abre el modal */}
        <ImagePopover src={src} />
      </div>
    );
  }

  return null;
}
