import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";

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
    Foto: "/public/images/Fotos Pruebas/Foto.jpg",
    INE: "/public/images/Fotos Pruebas/Ine.jpg",
    licencia: "/public/images/Fotos Pruebas/Licencia.jpg",
    tarjetaCirculacion: "/public/images/Fotos Pruebas/Tarjeta Circulacion.jpg",
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
];

export default function ConductoresPage() {
  return (
    <>
      <PageMeta
        title="Conductores"
        description="Gestión de conductores del sistema"
      />
      <PageBreadcrumb pageTitle="Conductores" />
      <div className="space-y-6">
        <ComponentCard title="Listado de Conductores">
          <BasicTable<Conductor> columns={columns} data={data} />
        </ComponentCard>
      </div>
    </>
  );
}
