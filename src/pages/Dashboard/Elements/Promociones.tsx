import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";
import AddPromotionButton from "../../../components/ui/button/addpromotionButton";
import { useState } from "react";
import AddPromotionModal from "../../../components/ui/modal/addPromotionModal";
import SearchBar from "../../../components/common/SearchBar";
import Pagination from "../../../components/common/Pagination";

export interface Promocion {
  id: number;
  concepto: string;
  fechaInicio: string;
  fechaExpiracion: string;
  tipoDescuento: string;
  descuento: string;
  cantidadTickets?: string;
  todosUsuarios: "Todos" | "Antiguos" | "Nuevos" | "NA";
  conductores:
    | "Todos"
    | "Antiguos"
    | "Nuevos"
    | "NA"
    | "Diario"
    | "Semanal"
    | "Mensual";
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
      cantidadTickets: "5",
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

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const rowsPerPage = 2;

  const filteredData = data.filter((promo) =>
    promo.concepto.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
            <div className="flex items-center">
              <SearchBar
                value={search}
                onChange={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
                placeholder="Buscar promoción..."
              />
            </div>
          }
        >
          <div className="flex justify-between items-center mb-4"></div>
          <BasicTable<Promocion>
            pageTitle="Promociones"
            tableType="promociones"
            columns={columns}
            data={paginatedData.map((item) => ({
              ...item,
              descuento:
                item.tipoDescuento === "Cantidad Fija" && item.cantidadTickets
                  ? `${item.descuento}\n(${item.cantidadTickets} tickets)`
                  : item.descuento,
            }))}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        </ComponentCard>
      </div>

      {/* BOTÓN FLOTANTE STICKY */}
      <div className="fixed bottom-6 right-3 z-50">
        <AddPromotionButton onClick={() => setModalOpen(true)} />
      </div>

      <AddPromotionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddPromotion}
      />
    </>
  );
}
