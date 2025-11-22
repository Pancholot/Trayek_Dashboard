import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";
import SearchBar from "../../../components/common/SearchBar";
import Pagination from "../../../components/common/Pagination";
import { useState } from "react";

interface LogPerfil {
  id: number;
  nombre: string;
  rol: string;
  accion: string;
  fecha: string;
}

const columns: { key: keyof LogPerfil; label: string }[] = [
  { key: "id", label: "ID Usuario" },
  { key: "nombre", label: "Nombre" },
  { key: "rol", label: "Rol" },
  { key: "accion", label: "Acción Realizada" },
  { key: "fecha", label: "Fecha" },
];

const data: LogPerfil[] = [
  {
    id: 1,
    nombre: "Luis Gutiérrez",
    rol: "Desarrollador",
    accion: "Suspendió al conductor: Carlos López",
    fecha: "2025-02-20 14:33",
  },
  {
    id: 2,
    nombre: "Reynolds",
    rol: "Administrador",
    accion: "Aprobó nuevo conductor: Juan Pérez",
    fecha: "2025-02-20 10:12",
  },
  {
    id: 3,
    nombre: "Francisco Faller",
    rol: "Desarrollador",
    accion: "Aprobó promoción: Descuento de Verano",
    fecha: "2025-02-19 18:20",
  },
];

export default function LogsPerfilPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const rowsPerPage = 5;

  const filteredData = data.filter(
    (log) =>
      log.nombre.toLowerCase().includes(search.toLowerCase()) ||
      log.accion.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <PageMeta
        title="Logs de Perfil"
        description="Registro de acciones de usuarios del sistema"
      />

      <PageBreadcrumb pageTitle="Logs de Perfil" />

      <div className="space-y-6">
        <ComponentCard
          title="Historial de Acciones"
          headerAction={
            <div className="flex items-center">
              <SearchBar
                value={search}
                onChange={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
                placeholder="Buscar log..."
              />
            </div>
          }
        >
          <BasicTable<LogPerfil> columns={columns} data={paginatedData} />

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
