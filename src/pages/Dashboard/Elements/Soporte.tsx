import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";

interface Soporte {
  id: number;
  emitido: string;
  estado: "Abierto" | "En progreso" | "Cerrado";
  comentarios: string;
}

const columns: { key: keyof Soporte; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "emitido", label: "Emitido" },
  { key: "estado", label: "Estado" },
  { key: "comentarios", label: "Comentarios" },
];

const data: Soporte[] = [
  {
    id: 1,
    emitido: "2024-06-15",
    estado: "Abierto",
    comentarios: "El conductor no llegó a tiempo.",
  },
  {
    id: 2,
    emitido: "2024-06-16",
    estado: "En progreso",
    comentarios: "Problema con el pago de la tarifa.",
  },
  {
    id: 3,
    emitido: "2024-06-17",
    estado: "Cerrado",
    comentarios: "El pasajero olvidó un objeto en el vehículo.",
  },
];

export default function SoportePage() {
  return (
    <>
      <PageMeta title="Soporte" description="Gestión de Atención a Usuarios" />
      <PageBreadcrumb pageTitle="Soporte" />
      <div className="space-y-6">
        <ComponentCard title="Listado de Atención a Usuarios">
          <BasicTable<Soporte> columns={columns} data={data} />
        </ComponentCard>
      </div>
    </>
  );
}
