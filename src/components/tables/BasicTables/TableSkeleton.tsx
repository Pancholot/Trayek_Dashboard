export default function TableSkeleton({ rows = 2, columns = 8 }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-white/[0.05]">
              {Array.from({ length: columns }).map((_, i) => (
                <th
                  key={i}
                  className="px-5 py-3 text-center text-gray-500 dark:text-white"
                >
                  <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-5 py-4 text-center">
                    <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
