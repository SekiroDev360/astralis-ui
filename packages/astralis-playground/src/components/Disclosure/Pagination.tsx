import { useState } from "react";
import { Pagination } from "astralis-ui";

export default function PaginationShowcase() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  // Mock list items to simulate changing items per page
  const items = Array.from({ length: 5 }, (_, i) => ({
    id: (currentPage - 1) * 5 + i + 1,
    name: `User Profile #${(currentPage - 1) * 5 + i + 1}`,
    role: ["Administrator", "Editor", "Developer", "Designer", "Support Specialist"][i % 5],
    status: i % 3 === 0 ? "Active" : "Away",
  }));

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-8 p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md transition-colors duration-200">
      
      {/* Description */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Dynamic Pagination Showcase</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Features custom focus-ring access, tree-shakable chevron controls, and the new <span className="font-semibold text-green-600 dark:text-green-400">&lt;Pagination.Pages /&gt;</span> auto-calculating layout manager.
        </p>
      </div>

      {/* Mock Table/List */}
      <div className="border border-zinc-150 dark:border-zinc-800/80 rounded-xl overflow-hidden bg-zinc-50/20 dark:bg-zinc-950/20">
        <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center px-6 py-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 flex items-center justify-center font-bold text-xs">
                  {item.id}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.name}</span>
                  <span className="text-xs text-zinc-500">{item.role}</span>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                item.status === "Active"
                  ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-450 border border-green-200/50 dark:border-green-800/30"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center py-4 border-t border-zinc-100 dark:border-zinc-800/80 gap-4 flex-wrap">
        <span className="text-xs text-zinc-500">
          Showing page <span className="font-semibold text-zinc-900 dark:text-zinc-100">{currentPage}</span> of {totalPages}
        </span>

        <Pagination page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}>
          <Pagination.List>
            <Pagination.Prev />
            {/* Exposing the dynamic double-ellipsis sliding page component! */}
            <Pagination.Pages siblings={1} />
            <Pagination.Next />
          </Pagination.List>
        </Pagination>
      </div>

    </div>
  );
}
