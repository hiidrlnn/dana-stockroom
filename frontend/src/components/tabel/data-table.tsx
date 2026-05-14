type Props = {
  headers: string[];
  children: React.ReactNode;
};

export default function DataTable({ headers, children }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            {headers.map((header) => (
              <th key={header} className="pb-4 text-left text-sm text-gray-400">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
