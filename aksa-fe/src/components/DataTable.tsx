import { useState, useEffect } from "react";
import Input from "./forms/input";
import Button from "./Button";
import { Pagination, type PaginationProps } from "./Pagination";

export type ColumnDefinition<T> = {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
};

type DataTableActionProps<T> = {
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
};

type DataTableSearchProps = {
  searchable?: boolean;
  onSearch?: (query: string) => void;
  initialSearch?: string;
};

type DataTableDisplayProps = {
  title: string;
  emptyStateText?: string;
  buttonText?: string;
};

export type DataTableProps<T> = {
  data: T[];
  columns: ColumnDefinition<T>[];
  display?: DataTableDisplayProps;
  actions?: DataTableActionProps<T>;
  search: DataTableSearchProps;
  pagination?: PaginationProps;
};

export default function DataTable<T>({
  data,
  display,
  columns,
  actions,
  search,
  pagination,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState(search.initialSearch || "");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    search.onSearch?.(query);
  };

  useEffect(() => {
    setSearchQuery(search.initialSearch || "");
  }, [search.initialSearch]);

  return (
    <div className="flex flex-col my-4 text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 py-4">
        <h2 className="font-bold text-xl">{display?.title || "Table"}</h2>

        {search.searchable && (
          <div className="w-full max-w-xl">
            <Input
              type="text"
              hideLabel
              placeholder={`Search ${
                display?.title.toLowerCase() || "table"
              }...`}
              name="search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded-full"
            />
          </div>
        )}

        {actions?.onAdd && (
          <Button className="max-w-48 rounded-2xl" onClick={actions.onAdd}>
            {display?.buttonText || "Add Record"}
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-base text-left rtl:text-right text-foreground">
          <thead className="text-foreground">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="first:ps-0 last:pe-0 px-6 py-3"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
              {(actions?.onEdit || actions?.onDelete) && (
                <th className="px-6 py-3">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 first:ps-0 last:pe-0"
                    >
                      {column.render
                        ? column.render(item)
                        : (item as Record<string, any>)[column.key]}
                    </td>
                  ))}
                  {(actions?.onEdit || actions?.onDelete) && (
                    <td className="px-6 py-4 space-x-4">
                      {actions.onEdit && (
                        <button
                          onClick={() => actions.onEdit?.(item)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                      {actions.onDelete && (
                        <button
                          onClick={() => actions.onDelete?.(item)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr className="bg-background">
                <td
                  colSpan={
                    columns.length +
                    (actions?.onEdit || actions?.onDelete ? 1 : 0)
                  }
                  className="px-6 py-4 text-center"
                >
                  {display?.emptyStateText || "No data"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {pagination && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        )}
      </div>
    </div>
  );
}
