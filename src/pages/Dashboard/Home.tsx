import PageMeta from "../../components/common/PageMeta";
import ModuleCards from "../../components/dashboard/ModuleCards";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Trayek Panel de Administración"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <ModuleCards />
        </div>
      </div>
    </>
  );
}
