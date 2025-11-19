import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";
import Pagination from "../../../components/common/Pagination";
import SearchBar from "../../../components/common/SearchBar";
import { useState } from "react";

interface Viaje {
  id: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  conductor: string;
  pasajero: string;
  estado: "Exitoso" | "En disputa" | "Cancelado";
}

const columns: { key: keyof Viaje; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "fecha", label: "Fecha" },
  { key: "horaInicio", label: "Hora de Inicio" },
  { key: "horaFin", label: "Hora de Fin" },
  { key: "conductor", label: "Conductor" },
  { key: "pasajero", label: "Pasajero" },
  { key: "estado", label: "Estado" },
];

const data: Viaje[] = [
  {
    id: 1,
    fecha: "2024-06-15",
    horaInicio: "10:00 AM",
    horaFin: "10:30 AM",
    conductor: "David Conductor Prueba",
    pasajero: "Luis Pasajero Prueba",
    estado: "Exitoso",
  },
  {
    id: 2,
    fecha: "2024-06-16",
    horaInicio: "11:00 AM",
    horaFin: "11:45 AM",
    conductor: "Antonio Conductor Prueba",
    pasajero: "Francisco Pasajero Prueba",
    estado: "En disputa",
  },
  {
    id: 3,
    fecha: "2024-06-17",
    horaInicio: "09:30 AM",
    horaFin: "10:15 AM",
    conductor: "Francisco Conductor Prueba",
    pasajero: "Sergio Pasajero Prueba",
    estado: "Cancelado",
  },
];

export default function ViajesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const rowsPerPage = 2;

  const filteredData = data.filter(
    (viajes) =>
      viajes.conductor.toLowerCase().includes(search.toLowerCase()) ||
      viajes.pasajero.toLowerCase().includes(search.toLowerCase()) ||
      viajes.estado.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return (
    <>
      <PageMeta title="Viajes" description="Gestión de viajes del sistema" />
      <PageBreadcrumb pageTitle="Viajes" />
      <div className="space-y-6">
        <ComponentCard
          title="Listado de Viajes"
          headerAction={
            <div className="flex items-center">
              <SearchBar
                value={search}
                onChange={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
                placeholder="Buscar viajes..."
              />
            </div>
          }
        >
          <BasicTable<Viaje> columns={columns} data={paginatedData} />
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
