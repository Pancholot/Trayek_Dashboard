interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar...",
}: SearchBarProps) {
  return (
    <div className="flex justify-end mb-4">
      <input
        type="text"
        placeholder={placeholder}
        className="px-3 py-2 border rounded w-64 border-black dark:border-white bg-blue-dark-Trayek text-white dark:bg-blue-light-Trayek"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
