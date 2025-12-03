import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Verify from "../../ui/verify/verificar";
import Suspend from "../../ui/verify/suspend";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T, rowIndex?: number) => React.ReactNode;
  onUpdateRow?: (rowIndex: number, updates: Partial<T>) => void;
}

interface BasicTableProps<T> {
  columns: Column<T>[];
  data: T[];
  tableType?: "conductores" | "vehiculos" | "promociones" | "pasajeros";
  pageTitle?: string;
  onUpdateRow?: (rowIndex: number, updates: Partial<T>) => void;
}

export default function BasicTable<T extends object>({
  columns,
  data,
  tableType,
  pageTitle,
  onUpdateRow,
}: BasicTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={String(col.key)}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-center align-middle text-theme-xs dark:text-white"
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="px-5 py-10 text-center text-gray-400 dark:text-gray-300"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-lg font-medium">
                      {pageTitle
                        ? `No se encontraron ${pageTitle.toLowerCase()}`
                        : "No se encontraron resultados"}
                    </span>

                    <span className="text-sm opacity-70">
                      Intenta ajustar tus parametros de búsqueda o cambiar de
                      página.
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => {
                  const value = row[col.key];
                  const key = `${rowIndex}-${String(col.key)}`;

                  // Render custom function columns
                  if (col.render) {
                    return (
                      <TableCell
                        key={key}
                        className="px-5 py-4 text-center dark:text-white"
                      >
                        {col.render(row, rowIndex)}
                      </TableCell>
                    );
                  }

                  // Boolean columns (verified)
                  if (typeof value === "boolean") {
                    const isMasterColumn = col.key === "verified";

                    return (
                      <TableCell
                        key={key}
                        className="px-5 py-4 text-center dark:text-white"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Verify
                            initialValue={value}
                            labelOn="Aprobar"
                            labelOff="Negar"
                            isMaster={isMasterColumn}
                            onChangeVerified={(newValue) => {
                              if (onUpdateRow) {
                                onUpdateRow(rowIndex, {
                                  verified: newValue,
                                } as unknown as Partial<T>);
                              }
                            }}
                          />

                          {tableType === "conductores" && (
                            <Suspend initialValue={value} />
                          )}
                        </div>
                      </TableCell>
                    );
                  }

                  // Default text cell
                  return (
                    <TableCell
                      key={key}
                      className="px-5 py-4 text-center dark:text-white"
                    >
                      {String(value)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
