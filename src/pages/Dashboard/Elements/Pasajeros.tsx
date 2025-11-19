import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";
import SearchBar from "../../../components/common/SearchBar";
import Pagination from "../../../components/common/Pagination";
import { useState } from "react";

interface Pasajero {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
}

const columns: { key: keyof Pasajero; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "correo", label: "Correo" },
  { key: "telefono", label: "Teléfono" },
];

const data: Pasajero[] = [
  {
    id: 1,
    nombre: "Luis Pasajero Prueba",
    correo: "luis_pasajero@trayek.com",
    telefono: "8765432101",
  },
  {
    id: 2,
    nombre: "Sergio Pasajero Prueba",
    correo: "sergio_pasajero@trayek.com",
    telefono: "5432109876",
  },
  {
    id: 3,
    nombre: "Francisco Pasajero Prueba",
    correo: "francisco_pasajero@trayek.com",
    telefono: "9876543210",
  },
];

export default function PasajerosPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const rowsPerPage = 2;

  const filteredData = data.filter(
    (pasajero) =>
      pasajero.nombre.toLowerCase().includes(search.toLowerCase()) ||
      pasajero.correo.toLowerCase().includes(search.toLowerCase()) ||
      pasajero.telefono.includes(search)
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return (
    <>
      <PageMeta
        title="Pasajeros"
        description="Gestión de Pasajeros del sistema"
      />
      <PageBreadcrumb pageTitle="Pasajeros" />
      <div className="space-y-6">
        <ComponentCard
          title="Listado de Pasajeros"
          headerAction={
            <div className="flex items-center">
              <SearchBar
                value={search}
                onChange={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
                placeholder="Buscar pasajero..."
              />
            </div>
          }
        >
          <BasicTable<Pasajero> columns={columns} data={paginatedData} />
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
