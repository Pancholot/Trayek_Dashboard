import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";

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
    foto_placa: "../../../../public/images/Fotos Pruebas/Placa.png",
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
  },
];

export default function VehiculosPage() {
  return (
    <>
      <PageMeta
        title="Vehiculo"
        description="Gestión de vehiculos del sistema"
      />
      <PageBreadcrumb pageTitle="Vehiculos" />
      <div className="space-y-6">
        <ComponentCard title="Listado de Vehiculos">
          <BasicTable<Vehiculo> columns={columns} data={data} />
        </ComponentCard>
      </div>
    </>
  );
}
