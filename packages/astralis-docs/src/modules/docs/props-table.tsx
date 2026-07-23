export interface PropRow {
  prop: string;
  type: string;
  default?: string;
  description: string;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="docs-scroll my-6 overflow-x-auto rounded-xl border border-stroke-subtle">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-stroke-subtle bg-surface-subtle">
            <th className="px-4 py-2.5 font-medium text-label">Prop</th>
            <th className="px-4 py-2.5 font-medium text-label">Type</th>
            <th className="px-4 py-2.5 font-medium text-label">Default</th>
            <th className="px-4 py-2.5 font-medium text-label">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.prop}
              className="border-b border-stroke-subtle align-top last:border-b-0"
            >
              <td className="px-4 py-3">
                <code className="rounded-md bg-accent-subtle px-1.5 py-0.5 font-mono text-[12px] text-accent-label">
                  {row.prop}
                </code>
              </td>
              <td className="max-w-60 px-4 py-3">
                <code className="font-mono text-[12px] text-label-muted">{row.type}</code>
              </td>
              <td className="px-4 py-3">
                {row.default ? (
                  <code className="font-mono text-[12px] text-label-muted">{row.default}</code>
                ) : (
                  <span className="text-label-subtle">—</span>
                )}
              </td>
              <td className="min-w-56 px-4 py-3 leading-relaxed text-label-muted">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
