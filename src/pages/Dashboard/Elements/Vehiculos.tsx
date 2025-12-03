import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable, {
  Column,
} from "../../../components/tables/BasicTables/BasicTable";
import Pagination from "../../../components/common/Pagination";
import SearchBar from "../../../components/common/SearchBar";
import { useEffect, useState } from "react";
import Vehicle from "../../../types/Vehicle";
import DocumentsModal, {
  DocumentItem,
} from "../../../components/ui/modal/documentModal";
import TableSkeleton from "../../../components/tables/BasicTables/TableSkeleton";

const vehicleDocs: DocumentItem<Vehicle>[] = [
  { label: "Foto Placa", key: "licensePlatePhoto" },
  { label: "Foto Vehículo", key: "vehiclePhoto" },
  { label: "Seguro del Vehículo", key: "vehicleInsurance" },
  { label: "Registro de Circulación", key: "registration" },
];

export default function VehiculosPage() {
  const [vehicleList, setVehicleList] = useState<Vehicle[]>([
    {
      id: 1,
      driver: "David Conductor Prueba",
      licensePlate: "99-ABC-1",
      brand: "Toyota",
      model: "Corolla",
      year: "2020",
      color: "Blanco",
      type: "Sedán",
      licensePlatePhoto: "/images/Fotos Pruebas/Placa.png",
      vehiclePhoto: "/images/Fotos Pruebas/Coche.jpg",
      vehicleInsurance: "/images/Fotos Pruebas/seguro.png",
      registration: "/images/Fotos Pruebas/Tarjeta Circulacion.jpg",
      verified: false,
    },
    {
      id: 2,
      driver: "Antonio Conductor Prueba",
      licensePlate: "67-DEF-2",
      brand: "BMW",
      model: "X5",
      year: "2021",
      color: "Negro",
      type: "Sedán",
      licensePlatePhoto: "/images/docs/placa-67-DEF-2.png",
      vehiclePhoto: "/images/docs/vehiculo-67-DEF-2.png",
      vehicleInsurance: "/images/docs/seguro-67-DEF-2.png",
      registration: "/images/docs/registro-67-DEF-2.png",
      verified: false,
    },
    {
      id: 3,
      driver: "Francisco Conductor Prueba",
      licensePlate: "87-GHI-3",
      brand: "Honda",
      model: "Civic",
      year: "2019",
      color: "Azul",
      type: "Sedán",
      licensePlatePhoto: "/images/docs/placa-87-GHI-3.png",
      vehiclePhoto: "/images/docs/vehiculo-87-GHI-3.png",
      vehicleInsurance: "/images/docs/seguro-87-GHI-3.png",
      registration: "/images/docs/registro-87-GHI-3.png",
      verified: false,
    },
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 2;

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [loading]);

  const filteredData = vehicleList.filter(
    (vehiculo) =>
      vehiculo.driver.toLowerCase().includes(search.toLowerCase()) ||
      vehiculo.licensePlate.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns: Column<Vehicle>[] = [
    { key: "id", label: "ID" },
    { key: "driver", label: "Conductor" },
    { key: "licensePlate", label: "Placa" },
    { key: "brand", label: "Marca" },
    { key: "model", label: "Modelo" },
    { key: "year", label: "Año" },
    { key: "color", label: "Color" },
    { key: "type", label: "Tipo" },
    {
      key: "documentos" as keyof Vehicle,
      label: "Documentos",
      render: (row: Vehicle) => (
        <button
          className="px-3 py-1 bg-blue-dark-Trayek border-2 text-white rounded-lg"
          onClick={() => setSelectedVehicle(row)}
        >
          Ver
        </button>
      ),
    },
    { key: "verified", label: "Verificación" },
  ];

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
          {loading ? (
            <TableSkeleton rows={rowsPerPage} columns={columns.length} />
          ) : (
            <BasicTable<Vehicle>
              pageTitle="Vehículos"
              tableType="vehiculos"
              columns={columns}
              data={paginatedData}
              onUpdateRow={(rowIndex, updates) => {
                setVehicleList((prev) => {
                  const updated = [...prev];
                  updated[rowIndex] = { ...updated[rowIndex], ...updates };
                  return updated;
                });
              }}
            />
          )}

          {selectedVehicle && (
            <DocumentsModal
              open={!!selectedVehicle}
              onClose={() => setSelectedVehicle(null)}
              title={`Documentos del Vehículo: ${selectedVehicle.licensePlate}`}
              data={selectedVehicle}
              documents={vehicleDocs}
              masterVerified={selectedVehicle.verified}
            />
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={(page) => {
              setLoading(true);
              setCurrentPage(page);
            }}
          />
        </ComponentCard>
      </div>
    </>
  );
}
