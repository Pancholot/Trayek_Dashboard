import { X, Check, XCircle, Minus } from "lucide-react";
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
  masterVerified?: boolean;
}

type DocState = "missing" | "pending" | "approved";

export default function DocumentsModal<T>({
  open,
  onClose,
  title,
  data,
  documents,
  masterVerified = false,
}: DocumentsModalProps<T>) {
  const [status, setStatus] = useState<Record<string, DocState>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open) return;

    const initialState: Record<string, DocState> = {};
    let loadedCount = 0;

    documents.forEach((doc) => {
      const key = doc.key as string;
      const value = data[doc.key];

      if (!value || typeof value !== "string") {
        initialState[key] = "missing";
        loadedCount++;
        return;
      }

      const isImage = /\.(jpg|jpeg|png)$/i.test(value);
      if (!isImage) {
        initialState[key] = "missing";
        loadedCount++;
        return;
      }

      const img = new Image();
      img.src = value;

      img.onload = () => {
        initialState[key] = "pending";
        loadedCount++;
        if (loadedCount === documents.length) {
          setStatus(initialState);
          setLoaded(true);
        }
      };

      img.onerror = () => {
        initialState[key] = "missing";
        loadedCount++;
        if (loadedCount === documents.length) {
          setStatus(initialState);
          setLoaded(true);
        }
      };
    });
  }, [open, data, documents]);

  useEffect(() => {
    if (!open) return;
    if (!loaded) return;

    setStatus((prev) => {
      const newState = { ...prev };

      if (masterVerified) {
        Object.keys(newState).forEach((k) => {
          if (newState[k] === "pending") newState[k] = "approved";
        });
      } else {
        Object.keys(newState).forEach((k) => {
          if (newState[k] === "approved") newState[k] = "pending";
        });
      }

      return newState;
    });
  }, [masterVerified, loaded, open]);

  const approve = (key: string) => {
    setStatus((prev) => ({ ...prev, [key]: "approved" }));
  };

  const unapprove = (key: string) => {
    setStatus((prev) => ({ ...prev, [key]: "pending" }));
  };

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
            const key = doc.key as string;
            const value = data[doc.key];
            const state = status[key];

            return (
              <div
                key={key}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="text-black dark:text-white">{doc.label}</span>

                {state === "missing" && (
                  <XCircle className="text-red-500 w-6 h-6" />
                )}

                {state === "pending" && (
                  <div className="flex items-center gap-2">
                    <button onClick={() => approve(key)}>
                      <Minus className="text-orange-500 w-6 h-6" />
                    </button>
                    <ImagePopover src={value as string} />
                  </div>
                )}

                {state === "approved" && (
                  <div className="flex items-center gap-2">
                    <button onClick={() => unapprove(key)}>
                      <Check className="text-green-500 w-5 h-5" />
                    </button>
                    <ImagePopover src={value as string} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
