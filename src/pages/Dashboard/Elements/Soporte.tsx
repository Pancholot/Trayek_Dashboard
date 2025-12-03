import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";
import SearchBar from "../../../components/common/SearchBar";
import Pagination from "../../../components/common/Pagination";
import { useState } from "react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const rowsPerPage = 2;

  const filteredData = data.filter((soporte) =>
    soporte.estado.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return (
    <>
      <PageMeta title="Soporte" description="Gestión de Atención a Usuarios" />
      <PageBreadcrumb pageTitle="Soporte" />
      <div className="space-y-6">
        <ComponentCard
          title="Listado de Atención a Usuarios"
          headerAction={
            <div className="flex items-center">
              <SearchBar
                value={search}
                onChange={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
                placeholder="Buscar caso..."
              />
            </div>
          }
        >
          <BasicTable<Soporte>
            pageTitle="Casos de Soporte"
            columns={columns}
            data={paginatedData}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        </ComponentCard>
      </div>
    </>
  );
}
