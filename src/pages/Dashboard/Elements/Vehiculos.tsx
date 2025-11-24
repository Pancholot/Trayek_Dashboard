import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";
import Pagination from "../../../components/common/Pagination";
import SearchBar from "../../../components/common/SearchBar";
import { useState } from "react";

interface Vehiculo {
  id: number;
  conductor: string;
  placa: string;
  marca: string;
  modelo: string;
  año: string;
  color: string;
  tipo: string;
  foto_placa: string;
  foto_vehiculo: string;
  seguro_vehiculo: string;
  registroCirculacion: string;
  verificado: boolean;
}

const columns: { key: keyof Vehiculo; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "conductor", label: "Conductor" },
  { key: "placa", label: "Placa" },
  { key: "marca", label: "Marca" },
  { key: "modelo", label: "Modelo" },
  { key: "año", label: "Año" },
  { key: "color", label: "Color" },
  { key: "tipo", label: "Tipo" },
  { key: "foto_placa", label: "Foto Placa" },
  { key: "foto_vehiculo", label: "Foto Vehículo" },
  { key: "seguro_vehiculo", label: "Seguro Vehículo" },
  { key: "registroCirculacion", label: "Registro de Circulación" },
  { key: "verificado", label: "Verificación" },
];

const data: Vehiculo[] = [
  {
    id: 1,
    conductor: "David Conductor Prueba",
    placa: "99-ABC-1",
    marca: "Toyota",
    modelo: "Corolla",
    año: "2020",
    color: "Blanco",
    tipo: "Sedán",
    foto_placa: "/images/Fotos Pruebas/Placa.png",
    foto_vehiculo: "/images/Fotos Pruebas/Coche.jpg",
    seguro_vehiculo: "/images/Fotos Pruebas/seguro.png",
    registroCirculacion: "/images/Fotos Pruebas/Tarjeta Circulacion.jpg",
    verificado: false,
  },
  {
    id: 2,
    conductor: "Antonio Conductor Prueba",
    placa: "67-DEF-2",
    marca: "BMW",
    modelo: "X5",
    año: "2021",
    color: "Negro",
    tipo: "Sedán",
    foto_placa: "/images/docs/placa-67-DEF-2.png",
    foto_vehiculo: "/images/docs/vehiculo-67-DEF-2.png",
    seguro_vehiculo: "/images/docs/seguro-67-DEF-2.png",
    registroCirculacion: "/images/docs/registro-67-DEF-2.png",
    verificado: false,
  },
  {
    id: 3,
    conductor: "Francisco Conductor Prueba",
    placa: "87-GHI-3",
    marca: "Honda",
    modelo: "Civic",
    año: "2019",
    color: "Azul",
    tipo: "Sedán",
    foto_placa: "/images/docs/placa-87-GHI-3.png",
    foto_vehiculo: "/images/docs/vehiculo-87-GHI-3.png",
    seguro_vehiculo: "/images/docs/seguro-87-GHI-3.png",
    registroCirculacion: "/images/docs/registro-87-GHI-3.png",
    verificado: false,
  },
];

export default function VehiculosPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const rowsPerPage = 2;

  const filteredData = data.filter(
    (vehiculo) =>
      vehiculo.conductor.toLowerCase().includes(search.toLowerCase()) ||
      vehiculo.placa.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <PageMeta
        title="Vehiculo"
        description="Gestión de vehiculos del sistema"
      />
      <PageBreadcrumb pageTitle="Vehiculos" />
      <div className="space-y-6">
        <ComponentCard
          title="Listado de Vehiculos"
          headerAction={
            <div className="flex items-center">
              <SearchBar
                value={search}
                onChange={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
                placeholder="Buscar vehículo..."
              />
            </div>
          }
        >
          <BasicTable<Vehiculo>
            tableType="vehiculos"
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
