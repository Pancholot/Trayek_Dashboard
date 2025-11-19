import { useState } from "react";
import { Promocion } from "../../../pages/Dashboard/Elements/Promociones";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AddPromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Promocion, "id">) => void;
}

export default function AddPromotionModal({
  isOpen,
  onClose,
  onSave,
}: AddPromotionModalProps) {
  const [concepto, setConcepto] = useState("");
  const [tipoDescuento, setTipoDescuento] = useState("Porcentaje");
  const [descuento, setDescuento] = useState("");
  const [cantidadTickets, setCantidadTickets] = useState("");
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaExpiracion, setFechaExpiracion] = useState<Date | null>(null);
  const [todosUsuarios, setTodosUsuarios] = useState("");
  const [conductores, setConductores] = useState("");
  const [pasajeros, setPasajeros] = useState("");

  if (!isOpen) return null;

  const capitalizeFirst = (value: string) => {
    if (!value) return "";
    const lower = value.trim().toLowerCase();
    if (lower === "na") return "NA";
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!fechaInicio || !fechaExpiracion) {
      alert("Por favor selecciona ambas fechas.");
      return;
    }

    if (fechaExpiracion < fechaInicio) {
      alert("La fecha de expiración no puede ser anterior a la de inicio.");
      return;
    }

    onSave({
      concepto,
      tipoDescuento,
      descuento,
      cantidadTickets,
      fechaInicio: fechaInicio.toISOString().split("T")[0],
      fechaExpiracion: fechaExpiracion.toISOString().split("T")[0],
      todosUsuarios: todosUsuarios as "Todos" | "Antiguos" | "Nuevos" | "NA",
      conductores: conductores as "Todos" | "Antiguos" | "Nuevos" | "NA",
      pasajeros: pasajeros as "Todos" | "Antiguos" | "Nuevos" | "NA",
      aplicado: false,
    });

    setConcepto("");
    setTipoDescuento("Porcentaje");
    setDescuento("");
    setFechaInicio(null);
    setFechaExpiracion(null);
    setCantidadTickets("");
    setTodosUsuarios("");
    setConductores("");
    setPasajeros("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#000000cc] flex justify-center items-center z-[100]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Agregar Promoción
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3" noValidate={false}>
          {/* Concepto */}
          <input
            className="w-full border rounded p-2"
            placeholder="Concepto"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            required
          />

          {/* Fechas */}
          <div className="flex gap-2">
            <DatePicker
              selected={fechaInicio}
              onChange={(date) => setFechaInicio(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Inicio"
              className="w-1/2 border rounded p-2"
              minDate={new Date()}
              popperPlacement="bottom-start"
            />
            <DatePicker
              selected={fechaExpiracion}
              onChange={(date) => setFechaExpiracion(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Expiración"
              className="w-1/2 border rounded p-2"
              minDate={new Date()}
              popperPlacement="bottom-start"
            />
          </div>

          {/* Tipo de descuento */}
          <select
            className="w-full border rounded p-2"
            value={tipoDescuento}
            onChange={(e) => setTipoDescuento(e.target.value)}
          >
            <option>Porcentaje</option>
            <option>Cantidad Fija</option>
          </select>

          {/* Descuento */}
          <input
            className="w-full border rounded p-2"
            placeholder={
              tipoDescuento === "Cantidad Fija"
                ? "Descuento en $ (ej. $10)"
                : "Descuento en % (ej. 15%)"
            }
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
            required
            pattern={
              tipoDescuento === "Cantidad Fija"
                ? "^\\$\\d+(\\.\\d{1,2})?$"
                : "^\\d+(\\.\\d{1,2})?%$"
            }
            title={
              tipoDescuento === "Cantidad Fija"
                ? "Debe ser un monto válido. Ej: $10 o $5.50"
                : "Debe ser un porcentaje válido. Ej: 15% o 5%"
            }
          />

          {tipoDescuento === "Cantidad Fija" && (
            <input
              className="w-full border rounded p-2"
              placeholder="Cantidad de Tickets"
              value={cantidadTickets}
              onChange={(e) => setCantidadTickets(e.target.value)}
              required
              pattern="^[0-9]+$"
              title="Debe ser un número entero."
            />
          )}

          {/* Usuarios */}
          <input
            className="w-full border rounded p-2"
            placeholder="Usuarios aplicables"
            value={todosUsuarios}
            onChange={(e) => setTodosUsuarios(capitalizeFirst(e.target.value))}
            required
            pattern="^(Todos|Antiguos|Nuevos|NA)$"
            title="Debe ser uno de los valores: Todos, Antiguos, Nuevos o NA."
          />
          <input
            className="w-full border rounded p-2"
            placeholder="Conductores aplicables"
            value={conductores}
            onChange={(e) => setConductores(capitalizeFirst(e.target.value))}
            required
            pattern="^(Todos|Antiguos|Nuevos|NA)$"
            title="Debe ser uno de los valores: Todos, Antiguos, Nuevos o NA."
          />
          <input
            className="w-full border rounded p-2"
            placeholder="Pasajeros aplicables"
            value={pasajeros}
            onChange={(e) => setPasajeros(capitalizeFirst(e.target.value))}
            required
            pattern="^(Todos|Antiguos|Nuevos|NA)$"
            title="Debe ser uno de los valores: Todos, Antiguos, Nuevos o NA."
          />

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
