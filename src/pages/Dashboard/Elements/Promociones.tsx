import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import BasicTable from "../../../components/tables/BasicTables/BasicTable";

interface Promocion {
  id: number;
  concepto: string;
  fechaInicio: string;
  fechaExpiracion: string;
  tipoDescuento: string;
  descuento: string;
  usuariosAplicables: string;
}

const columns: { key: keyof Promocion; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "concepto", label: "Concepto" },
  { key: "fechaInicio", label: "Fecha de Inicio" },
  { key: "fechaExpiracion", label: "Fecha de Expiración" },
  { key: "tipoDescuento", label: "Tipo de Descuento" },
  { key: "descuento", label: "Descuento" },
  { key: "usuariosAplicables", label: "Usuarios Aplicables" },
];

const data: Promocion[] = [
  {
    id: 1,
    concepto: "Descuento de Verano",
    fechaInicio: "2024-06-01",
    fechaExpiracion: "2024-08-31",
    tipoDescuento: "Porcentaje",
    descuento: "15%",
    usuariosAplicables: "Todos los usuarios",
  },
  {
    id: 2,
    concepto: "Descuento para Nuevos Usuarios",
    fechaInicio: "2024-01-01",
    fechaExpiracion: "2024-12-31",
    tipoDescuento: "Cantidad Fija",
    descuento: "$10",
    usuariosAplicables: "Nuevos usuarios",
  },
  {
    id: 3,
    concepto: "Descuento para Conductores",
    fechaInicio: "2024-06-01",
    fechaExpiracion: "2024-12-31",
    tipoDescuento: "Porcentaje",
    descuento: "20%",
    usuariosAplicables: "Conductores",
  },
];

export default function PromocionPage() {
  return (
    <>
      <PageMeta
        title="Promociones"
        description="Gestión de promociones del sistema"
      />
      <PageBreadcrumb pageTitle="Promociones" />
      <div className="space-y-6">
        <ComponentCard title="Listado de Promociones">
          <BasicTable<Promocion> columns={columns} data={data} />
        </ComponentCard>
      </div>
    </>
  );
}
