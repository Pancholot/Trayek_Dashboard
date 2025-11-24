import { X, Check, XCircle } from "lucide-react";
import ImagePopover from "../../ui/popup/popup";
import { useEffect, useState } from "react";

export interface DocumentItem<T> {
  label: string;
  key: keyof T;
}

interface DocumentsModalProps<T> {
  open: boolean;
  onClose: () => void;
  title: string;
  data: T;
  documents: DocumentItem<T>[];
}

export default function DocumentsModal<T>({
  open,
  onClose,
  title,
  data,
  documents,
}: DocumentsModalProps<T>) {
  const [imageStatus, setImageStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!open) return;

    documents.forEach((doc) => {
      const value = data[doc.key];

      if (typeof value === "string" && value.match(/\.(jpg|jpeg|png)$/i)) {
        const img = new Image();
        img.src = value;

        img.onload = () =>
          setImageStatus((prev) => ({ ...prev, [doc.key as string]: true }));

        img.onerror = () =>
          setImageStatus((prev) => ({ ...prev, [doc.key as string]: false }));
      }
    });
  }, [open, data, documents]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-0">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[450px] relative shadow-xl">
        <button
          className="absolute right-4 top-4 dark:text-white"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-6 text-black dark:text-white">
          {title}
        </h2>

        <div className="space-y-5">
          {documents.map((doc) => {
            const value = data[doc.key];
            const isImage =
              typeof value === "string" && value.match(/\.(jpg|jpeg|png)$/i);

            const exists = imageStatus[doc.key as string];

            return (
              <div
                key={String(doc.key)}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="text-black dark:text-white">{doc.label}</span>

                {isImage ? (
                  exists ? (
                    <div className="flex items-center gap-2">
                      <Check className="text-green-500 w-5 h-5" />
                      <ImagePopover src={value} />
                    </div>
                  ) : (
                    <XCircle className="text-red-500 w-6 h-6" />
                  )
                ) : (
                  <XCircle className="text-red-500 w-6 h-6" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
