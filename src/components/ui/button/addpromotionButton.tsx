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
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 flex items-center gap-2 rounded-lg"
    >
      <TicketPlus size={18} />
      Agregar Promoción
    </button>
  );
}
