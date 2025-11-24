import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";
import SearchBar from "../../../components/common/SearchBar";
import Pagination from "../../../components/common/Pagination";
import Passenger from "../../../types/Passenger";
import { useEffect, useState } from "react";
import { apiService } from "../../../api/apiService";
import PageResponse from "../../../types/PageResponse";
import { useDebounce } from "../../../hooks/useDebounce";

const columns: { key: keyof Passenger; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "fullName", label: "Nombre" },
  { key: "email", label: "Correo" },
  { key: "phoneNumber", label: "Teléfono" },
  { key: "banned", label: "Suspendido" },
];

const data: Passenger[] = [
  {
    id: 1,
    fullName: "Luis Pasajero Prueba",
    email: "luis_pasajero@trayek.com",
    phoneNumber: "8765432101",
    banned: false,
  },
  {
    id: 2,
    fullName: "Sergio Pasajero Prueba",
    email: "sergio_pasajero@trayek.com",
    phoneNumber: "5432109876",
    banned: false,
  },
  {
    id: 3,
    fullName: "Francisco Pasajero Prueba",
    email: "francisco_pasajero@trayek.com",
    phoneNumber: "9876543210",
    banned: false,
  },
];

export default function PasajerosPage() {
  const [passengers, setPassengers] = useState<Passenger[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 30;
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = (await apiService.getPassengers(
          currentPage - 1,
          debouncedSearch,
          rowsPerPage
        )) as PageResponse<Passenger>;
        console.log(response);
        setPassengers(response.content);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching passengers:", error);
      }
    };
    fetchPassengers();
  }, [currentPage, debouncedSearch]);

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
          <BasicTable<Passenger>
            columns={columns}
            data={passengers}
            tableType="pasajeros"
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
