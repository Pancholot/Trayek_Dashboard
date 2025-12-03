import { Check, X } from "lucide-react";
import { useState } from "react";

interface VerificationProps {
  initialValue: boolean;
  labelOn?: string;
  labelOff?: string;
  isMaster?: boolean;
  onMasterApprove?: () => void;
  onMasterUnapprove?: () => void;
  onChangeVerified?: (newValue: boolean) => void;
}

export default function Verify({
  initialValue,
  labelOn = "Aprobar",
  labelOff = "Negar",
  isMaster = false,
  onMasterApprove,
  onMasterUnapprove,
  onChangeVerified,
}: VerificationProps) {
  const [verified, setVerified] = useState(initialValue);

  const toggleVerification = () => {
    const newValue = !verified;
    setVerified(newValue);
    onChangeVerified?.(newValue);

    if (isMaster) {
      if (newValue) {
        onMasterApprove?.();
      } else {
        onMasterUnapprove?.();
      }
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {verified ? (
        <Check className="text-green-500 w-5 h-5" />
      ) : (
        <X className="text-red-500 w-5 h-5" />
      )}

      <button
        onClick={toggleVerification}
        className="text-sm px-3 py-1 border bg-blue-dark-Trayek text-white dark:bg-white dark:text-black border-gray-300 rounded-lg hover:bg-blue-light-Trayek dark:hover:bg-gray-300 transition min-w-[105px] text-center"
      >
        {verified ? labelOff : labelOn}
      </button>
    </div>
  );
}
