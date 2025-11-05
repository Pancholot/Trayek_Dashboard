import { CircleCheck, CircleMinus } from "lucide-react";
import { useState } from "react";

interface SuspendProps {
  initialValue: boolean;
}

export default function Suspend({ initialValue }: SuspendProps) {
  const [suspended, setSuspended] = useState(initialValue);

  const toggleSuspension = () => setSuspended(!suspended);

  return (
    <div className="flex items-center justify-center gap-3 ">
      {suspended ? (
        <CircleCheck className="text-green-500 w-5 h-5" />
      ) : (
        <CircleMinus className="text-red-500 w-5 h-5" />
      )}
      <button
        onClick={toggleSuspension}
        className="text-sm px-3 py-1 border bg-blue-dark-Trayek text-white dark:bg-white dark:text-black border-gray-300 rounded-lg hover:bg-blue-light-Trayek dark:hover:bg-gray-300 transition min-w-[105px] text-center"
      >
        {suspended ? "Suspender" : "Activar"}
      </button>
    </div>
  );
}
