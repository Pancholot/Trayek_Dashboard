import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";
import AddPromotionButton from "../../../components/ui/button/addpromotionButton";
import { useState } from "react";
import AddPromotionModal from "../../../components/ui/modal/addPromotionModal";

export interface Promocion {
  id: number;
  concepto: string;
  fechaInicio: string;
  fechaExpiracion: string;
  tipoDescuento: string;
  descuento: string;
  todosUsuarios: "Todos" | "Antiguos" | "Nuevos" | "NA";
  conductores: "Todos" | "Antiguos" | "Nuevos" | "NA";
  pasajeros: "Todos" | "Antiguos" | "Nuevos" | "NA";
  aplicado: boolean;
}

const columns: { key: keyof Promocion; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "concepto", label: "Concepto" },
  { key: "fechaInicio", label: "Fecha de Inicio" },
  { key: "fechaExpiracion", label: "Fecha de Expiración" },
  { key: "tipoDescuento", label: "Tipo de Descuento" },
  { key: "descuento", label: "Descuento" },
  { key: "todosUsuarios", label: "Todos los Usuarios" },
  { key: "conductores", label: "Conductores" },
  { key: "pasajeros", label: "Pasajeros" },
  { key: "aplicado", label: "Aplicado" },
];

export default function PromocionPage() {
  const [data, setData] = useState<Promocion[]>([
    {
      id: 1,
      concepto: "Descuento de Verano",
      fechaInicio: "2024-06-01",
      fechaExpiracion: "2024-08-31",
      tipoDescuento: "Porcentaje",
      descuento: "15%",
      todosUsuarios: "Todos",
      conductores: "NA",
      pasajeros: "NA",
      aplicado: false,
    },
    {
      id: 2,
      concepto: "Descuento para Nuevos Usuarios",
      fechaInicio: "2024-01-01",
      fechaExpiracion: "2024-12-31",
      tipoDescuento: "Cantidad Fija",
      descuento: "$10",
      todosUsuarios: "Nuevos",
      conductores: "NA",
      pasajeros: "NA",
      aplicado: false,
    },
    {
      id: 3,
      concepto: "Descuento para Conductores Antiguos",
      fechaInicio: "2024-06-01",
      fechaExpiracion: "2024-12-31",
      tipoDescuento: "Porcentaje",
      descuento: "20%",
      todosUsuarios: "NA",
      conductores: "Antiguos",
      pasajeros: "NA",
      aplicado: false,
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddPromotion = (newPromo: Omit<Promocion, "id">) => {
    const newId = data.length + 1;
    setData([...data, { id: newId, ...newPromo }]);
  };

  return (
    <>
      <PageMeta
        title="Promociones"
        description="Gestión de promociones del sistema"
      />
      <PageBreadcrumb pageTitle="Promociones" />
      <div className="space-y-6">
        <ComponentCard
          title="Listado de Promociones"
          headerAction={
            <AddPromotionButton onClick={() => setModalOpen(true)} />
          }
        >
          <div className="flex justify-between items-center mb-4"></div>
          <BasicTable<Promocion>
            tableType="promociones"
            columns={columns}
            data={data}
          />
        </ComponentCard>
      </div>
      <AddPromotionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddPromotion}
      />
    </>
  );
}
