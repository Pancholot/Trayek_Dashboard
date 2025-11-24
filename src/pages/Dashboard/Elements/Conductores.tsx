import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable, {
  Column,
} from "../../../components/tables/BasicTables/BasicTable";
import SearchBar from "../../../components/common/SearchBar";
import Pagination from "../../../components/common/Pagination";
import { useEffect, useState } from "react";
import Driver from "../../../types/Drivers";
import DocumentsModal from "../../../components/ui/modal/documentModal";
import { DocumentItem } from "../../../components/ui/modal/documentModal";
import { useDebounce } from "../../../hooks/useDebounce";
import { apiService } from "../../../api/apiService";
import PageResponse from "../../../types/PageResponse";

const driverDocs: DocumentItem<Driver>[] = [
  { label: "Foto", key: "photo" },
  { label: "INE", key: "INE" },
  { label: "Licencia", key: "license" },
  { label: "Comprobante de Domicilio", key: "proofOfAddress" },
  { label: "Cumplimiento Fiscal", key: "taxCompliance" },
];

const data: Driver[] = [
  {
    id: 1,
    fullName: "David Conductor Prueba",
    email: "david_conductor@trayek.com",
    phoneNumber: "2226062862",
    photo: "/images/Fotos Pruebas/foto.jpg",
    INE: "/images/Fotos Pruebas/Ine.jpg",
    license: "/images/Fotos Pruebas/Licencia.jpg",
    proofOfAddress: "/images/Fotos Pruebas/domicilio.jpg",
    taxCompliance: "/images/Fotos Pruebas/Cumplimiento Fiscal.jpg",
    verified: false,
  },
  {
    id: 2,
    fullName: "Antonio Conductor Prueba",
    email: "antonio_conductor@trayek.com",
    phoneNumber: "1234567890",
    photo: "/images/Fotos Pruebas/antonio.jpg",
    INE: "/images/docs/ine-antonio.png",
    license: "/images/docs/licencia-antonio.png",
    proofOfAddress: "/images/docs/comprobante-antonio.png",
    taxCompliance: "/images/docs/fiscal-antonio.png",
    verified: false,
  },
  {
    id: 3,
    fullName: "Francisco Conductor Prueba",
    email: "francisco_conductor@trayek.com",
    phoneNumber: "7889456123",
    photo: "/images/Fotos Pruebas/francisco.jpg",
    INE: "/images/docs/ine-francisco.png",
    license: "/images/docs/licencia-francisco.png",
    proofOfAddress: "/images/docs/comprobante-francisco.png",
    taxCompliance: "/images/docs/fiscal-francisco.png",
    verified: false,
  },
];

export default function ConductoresPage() {
  const [selectedRow, setSelectedRow] = useState<Driver | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 2;
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const columns: Column<Driver>[] = [
    { key: "id", label: "ID" },
    { key: "fullName", label: "Nombre" },
    { key: "email", label: "Correo" },
    { key: "phoneNumber", label: "Teléfono" },
    {
      key: "documentos",
      label: "Documentos",
      render: (row: Driver) => (
        <button
          className="px-3 py-1 bg-blue-dark-Trayek border-2 text-white rounded-lg"
          onClick={() => setSelectedRow(row)}
        >
          Ver
        </button>
      ),
    },
    { key: "verified", label: "Verificación" },
  ];

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = (await apiService.getDrivers(
          currentPage - 1,
          debouncedSearch,
          rowsPerPage
        )) as PageResponse<Driver>;
        console.log(response);
        setDrivers(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchPassengers();
  }, [currentPage, debouncedSearch]);

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
          <BasicTable<Driver>
            tableType="conductores"
            columns={columns}
            data={drivers}
          />
          {selectedRow && (
            <DocumentsModal
              open={!!selectedRow}
              onClose={() => setSelectedRow(null)}
              title={`Documentos de ${selectedRow.fullName}`}
              data={selectedRow}
              documents={driverDocs}
            />
          )}
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
