import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";

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
  return (
    <>
      <PageMeta title="Viajes" description="Gestión de viajes del sistema" />
      <PageBreadcrumb pageTitle="Viajes" />
      <div className="space-y-6">
        <ComponentCard title="Listado de Viajes">
          <BasicTable<Viaje> columns={columns} data={data} />
        </ComponentCard>
      </div>
    </>
  );
}
