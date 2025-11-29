import { flexRender } from "@tanstack/react-table";

const Table = ({ table }: { table: any }) => {
  const isOverdue = (row: any) => {
    // Jika tidak punya close_date, tidak usah diwarnai
    if (!row.original.close_date) return false;

    const close = new Date(row.original.close_date);
    const now = new Date();

    // hitung selisih hari
    const diffDays = Math.floor((now.getTime() - close.getTime()) / (1000 * 60 * 60 * 24));

    return diffDays >= 1; // overdue jika ≥ 1 hari
  };

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "Segoe UI, sans-serif",
        fontSize: "14px",
        backgroundColor: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <thead>
        {table.getHeaderGroups().map((headerGroup: any) => (
          <tr
            key={headerGroup.id}
            style={{
              backgroundColor: "#2b6cb0",
              color: "white",
            }}
          >
            {headerGroup.headers.map((header: any) => (
              <th
                key={header.id}
                style={{
                  padding: "12px 16px",
                  textAlign: "left",
                  fontWeight: 600,
                  borderBottom: "2px solid #2c5282",
                }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row: any, rowIndex: number) => {
          const overdue = isOverdue(row);

          return (
            <tr
              key={row.id}
              style={{
                backgroundColor: overdue
                  ? "#ffe5e5" // 🔥 MERAH lembut jika overdue
                  : rowIndex % 2 === 0
                  ? "#ffffff"
                  : "#f7fafc",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = overdue
                  ? "#ffcccc" // hover merah lebih gelap
                  : "#ebf8ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = overdue
                  ? "#ffe5e5"
                  : rowIndex % 2 === 0
                  ? "#ffffff"
                  : "#f7fafc")
              }
            >
              {row.getVisibleCells().map((cell: any) => (
                <td
                  key={cell.id}
                  style={{
                    padding: "10px 16px",
                    borderBottom: "1px solid #e2e8f0",
                    color: "#2d3748",
                    whiteSpace: "normal",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
