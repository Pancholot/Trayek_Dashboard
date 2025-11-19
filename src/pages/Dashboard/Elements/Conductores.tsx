import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";
import SearchBar from "../../../components/common/SearchBar";
import Pagination from "../../../components/common/Pagination";
import { useState } from "react";

interface Conductor {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  Foto: string;
  INE: string;
  licencia: string;
  tarjetaCirculacion: string;
  verificado: boolean;
}

const columns: { key: keyof Conductor; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "correo", label: "Correo" },
  { key: "telefono", label: "Teléfono" },
  { key: "Foto", label: "Foto" },
  { key: "INE", label: "INE" },
  { key: "licencia", label: "Licencia" },
  { key: "tarjetaCirculacion", label: "Tarjeta de Circulación" },
  { key: "verificado", label: "Verificación" },
];

const data: Conductor[] = [
  {
    id: 1,
    nombre: "David Conductor Prueba",
    correo: "david_conductor@trayek.com",
    telefono: "2226062862",
    Foto: "/images/Fotos Pruebas/foto.jpg",
    INE: "/images/Fotos Pruebas/Ine.jpg",
    licencia: "/images/Fotos Pruebas/Licencia.jpg",
    tarjetaCirculacion: "/images/Fotos Pruebas/Tarjeta Circulacion.jpg",
    verificado: false,
  },
  {
    id: 2,
    nombre: "Antonio Conductor Prueba",
    correo: "antonio_conductor@trayek.com",
    telefono: "1234567890",
    Foto: "/images/Fotos Pruebas/antonio.jpg",
    INE: "/images/docs/ine-antonio.png",
    licencia: "/images/docs/licencia-antonio.png",
    tarjetaCirculacion: "/images/docs/tc-antonio.png",
    verificado: false,
  },
  {
    id: 3,
    nombre: "Francisco Conductor Prueba",
    correo: "francisco_conductor@trayek.com",
    telefono: "7889456123",
    Foto: "/images/Fotos Pruebas/francisco.jpg",
    INE: "/images/docs/ine-francisco.png",
    licencia: "/images/docs/licencia-francisco.png",
    tarjetaCirculacion: "/images/docs/tc-francisco.png",
    verificado: false,
  },
  {
    id: 4,
    nombre: "Francisco Conductor Prueba",
    correo: "francisco_conductor@trayek.com",
    telefono: "7889456123",
    Foto: "/images/Fotos Pruebas/francisco.jpg",
    INE: "/images/docs/ine-francisco.png",
    licencia: "/images/docs/licencia-francisco.png",
    tarjetaCirculacion: "/images/docs/tc-francisco.png",
    verificado: false,
  },
  {
    id: 5,
    nombre: "Francisco Conductor Prueba",
    correo: "francisco_conductor@trayek.com",
    telefono: "7889456123",
    Foto: "/images/Fotos Pruebas/francisco.jpg",
    INE: "/images/docs/ine-francisco.png",
    licencia: "/images/docs/licencia-francisco.png",
    tarjetaCirculacion: "/images/docs/tc-francisco.png",
    verificado: false,
  },
];

export default function ConductoresPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const rowsPerPage = 2;

  const filteredData = data.filter(
    (conductor) =>
      conductor.nombre.toLowerCase().includes(search.toLowerCase()) ||
      conductor.correo.toLowerCase().includes(search.toLowerCase()) ||
      conductor.telefono.includes(search)
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <PageMeta
        title="Conductores"
        description="Gestión de conductores del sistema"
      />
      <PageBreadcrumb pageTitle="Conductores" />
      <div className="space-y-6">
        <ComponentCard
          title="Listado de Conductores"
          headerAction={
            <div className="flex items-center">
              <SearchBar
                value={search}
                onChange={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
                placeholder="Buscar conductor..."
              />
            </div>
          }
        >
          <BasicTable<Conductor>
            tableType="conductores"
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
