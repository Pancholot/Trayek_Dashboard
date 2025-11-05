import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { X, Check } from "lucide-react";
import ImagePopover from "../../ui/popup/popup";
import Verify from "../../ui/verify/verificar";
import Suspend from "../../ui/verify/suspend";

interface Column<T> {
  key: keyof T;
  label: string;
}

interface BasicTableProps<T> {
  columns: Column<T>[];
  data: T[];
  tableType?: "conductores" | "vehiculos";
}

export default function BasicTable<T extends object>({
  columns,
  data,
  tableType,
}: BasicTableProps<T>) {
  const [imageStatus, setImageStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    data.forEach((row, rowIndex) => {
      Object.entries(row).forEach(([key, value]) => {
        if (typeof value === "string" && value.match(/\.(png|jpg|jpeg)$/i)) {
          const img = new Image();
          img.src = value;
          img.onload = () =>
            setImageStatus((prev) => ({
              ...prev,
              [`${rowIndex}-${key}`]: true,
            }));
          img.onerror = () =>
            setImageStatus((prev) => ({
              ...prev,
              [`${rowIndex}-${key}`]: false,
            }));
        }
      });
    });
  }, [data]);

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
                  className="px-5 py-3 font-medium text-gray-500 text-center align-middle text-theme-xs dark:text-gray-400"
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => {
                  const value = row[col.key];
                  const key = `${rowIndex}-${String(col.key)}`;
                  const exists = imageStatus[key];

                  if (
                    typeof value === "string" &&
                    value.match(/\.(png|jpg|jpeg)$/i)
                  ) {
                    return (
                      <TableCell
                        key={key}
                        className="px-5 py-4 text-center text-theme-sm"
                      >
                        <div className="flex items-center justify-center gap-2">
                          {exists ? (
                            <>
                              <Check className="text-green-500 w-5 h-5" />
                              <ImagePopover src={value} />
                            </>
                          ) : (
                            <X className="text-red-500 w-5 h-5" />
                          )}
                        </div>
                      </TableCell>
                    );
                  }
                  if (typeof value === "boolean") {
                    return (
                      <TableCell key={key} className="px-5 py-4 text-center">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Verify initialValue={value} />
                          {tableType === "conductores" && (
                            <Suspend initialValue={value} />
                          )}
                        </div>
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell
                      key={key}
                      className="px-5 py-4 text-center align-middle text-gray-700 dark:text-gray-300"
                    >
                      <div className="flex justify-center items-center gap-2">
                        {String(value)}
                      </div>
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
