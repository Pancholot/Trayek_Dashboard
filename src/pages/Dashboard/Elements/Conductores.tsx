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
import TableSkeleton from "../../../components/tables/BasicTables/TableSkeleton";

const driverDocs: DocumentItem<Driver>[] = [
  { label: "Foto", key: "photo" },
  { label: "INE", key: "INE" },
  { label: "Licencia", key: "license" },
  { label: "Comprobante de Domicilio", key: "proofOfAddress" },
  { label: "Cumplimiento Fiscal", key: "taxCompliance" },
];

export default function ConductoresPage() {
  const [selectedRow, setSelectedRow] = useState<Driver | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const rowsPerPage = 2;
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [loading, setLoading] = useState(false);

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
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        const response = (await apiService.getDrivers(
          currentPage - 1,
          debouncedSearch,
          rowsPerPage
        )) as PageResponse<Driver>;

        setDrivers(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
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
          {loading ? (
            <TableSkeleton rows={rowsPerPage} columns={columns.length} />
          ) : (
            <BasicTable<Driver>
              pageTitle="Conductores"
              tableType="conductores"
              columns={columns}
              data={drivers}
              onUpdateRow={(rowIndex, updates) => {
                setDrivers((prev) => {
                  const updated = [...prev];
                  updated[rowIndex] = { ...updated[rowIndex], ...updates };
                  return updated;
                });
              }}
            />
          )}

          {selectedRow && (
            <DocumentsModal
              open={!!selectedRow}
              onClose={() => setSelectedRow(null)}
              title={`Documentos de ${selectedRow.fullName}`}
              data={selectedRow}
              documents={driverDocs}
              masterVerified={selectedRow.verified}
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
