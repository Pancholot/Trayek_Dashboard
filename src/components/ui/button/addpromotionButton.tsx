import { TicketPlus } from "lucide-react";

interface AddPromotionButtonProps {
  onClick?: () => void;
}

export default function AddPromotionButton({
  onClick,
}: AddPromotionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-15 h-15 rounded-full border-4 bg-blue-light-Trayek border-blue-dark-Trayek dark:border-white dark:bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition-all"
    >
      <TicketPlus size={32} />
    </button>
  );
}
