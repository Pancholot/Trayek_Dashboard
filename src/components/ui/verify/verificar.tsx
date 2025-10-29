import { Check, X } from "lucide-react";
import { useState } from "react";

interface VerificationProps {
  initialValue: boolean;
}

export default function Verify({ initialValue }: VerificationProps) {
  const [verified, setVerified] = useState(initialValue);

  const toggleVerification = () => setVerified(!verified);

  return (
    <div className="flex items-center justify-center gap-3">
      {verified ? (
        <Check className="text-green-500 w-5 h-5" />
      ) : (
        <X className="text-red-500 w-5 h-5" />
      )}
      <button
        onClick={toggleVerification}
        className="text-sm px-3 py-1 border bg-blue-dark-Trayek text-white dark:bg-white dark:text-black border-gray-300 rounded-lg hover:bg-blue-light-Trayek dark:hover:bg-gray-300 transition"
      >
        {verified ? "Negar" : "Aprobar"}
      </button>
    </div>
  );
}
