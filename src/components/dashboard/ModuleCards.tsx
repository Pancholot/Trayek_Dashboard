import {
  Users,
  Car,
  Headset,
  Megaphone,
  CarFront,
  Tickets,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    title: "Conductores",
    color: "bg-indigo-500",
    icon: <Car size={32} />,
    path: "/conductores",
  },
  {
    title: "Pasajeros",
    color: "bg-teal-500",
    icon: <Users size={32} />,
    path: "/pasajeros",
  },
  {
    title: "Vehículos",
    color: "bg-cyan-500",
    icon: <CarFront size={32} />,
    path: "/vehiculos",
  },
  {
    title: "Viajes",
    color: "bg-amber-500",
    icon: <Tickets size={32} />,
    path: "/viajes",
  },
  {
    title: "Soporte",
    color: "bg-fuchsia-500",
    icon: <Headset size={32} />,
    path: "/soporte",
  },
  {
    title: "Promociones",
    color: "bg-green-500",
    icon: <Megaphone size={32} />,
    path: "/promociones",
  },
];

export default function ModulesGrid() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((mod, index) => (
        <div
          key={index}
          onClick={() => navigate(mod.path)} // ✅ go to the module's page
          className={`p-6 rounded-xl text-white flex justify-between items-center shadow-md transition-transform transform hover:scale-105 hover:opacity-90 cursor-pointer ${mod.color}`}
        >
          <div>
            <h3 className="text-xl font-semibold">{mod.title}</h3>
            <span className="text-sm underline mt-2 block">Más info</span>
          </div>
          {mod.icon}
        </div>
      ))}
    </div>
  );
}
