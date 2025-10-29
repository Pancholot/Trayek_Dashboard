import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";

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
  return (
    <>
      <PageMeta
        title="Pasajeros"
        description="Gestión de Pasajeros del sistema"
      />
      <PageBreadcrumb pageTitle="Pasajeros" />
      <div className="space-y-6">
        <ComponentCard title="Listado de Pasajeros">
          <BasicTable<Pasajero> columns={columns} data={data} />
        </ComponentCard>
      </div>
    </>
  );
}
