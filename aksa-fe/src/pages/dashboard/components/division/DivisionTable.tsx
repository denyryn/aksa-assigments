import { useState, useEffect, useMemo } from "react";
import DivisionModal from "./DivisionModal";
import DataTable from "../../../../components/DataTable";
import { useDivision } from "../../../../contexts/DivisionContext";
import type { Division } from "../../../../types/division";
import type { ColumnDefinition } from "../../../../components/DataTable";
import { useDebounce } from "../../../../hooks/useDebounce";
import { useQueryParam, usePageParam } from "../../../../hooks/UseQueryParams";

const divisionColumns: ColumnDefinition<Division>[] = [
  { key: "name", header: "Name" },
];

const PAGE_SIZE = 5;

export default function DivisionTable() {
  const { divisions, search, remove } = useDivision();

  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Division | null>(null);
  const [filtered, setFiltered] = useState<Division[]>(divisions || []);

  const [query, setQuery] = useQueryParam("div", "");
  const [currentPage, setCurrentPage] = usePageParam("div_page", 1);
  const debouncedQuery = useDebounce(query, 300);

  // Filter on search
  useEffect(() => {
    const result = search(debouncedQuery);
    setFiltered(result);
    setCurrentPage(1); // Reset to first page on new search
  }, [debouncedQuery, search]);

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filtered.length / PAGE_SIZE);
  }, [filtered]);

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAdd = () => {
    setSelectedData(null);
    setOpen(true);
  };

  const handleEdit = (division: Division) => {
    setSelectedData(division);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedData(null);
  };

  const handleDelete = (division: Division) => {
    remove(division.id);
  };

  return (
    <>
      <DataTable
        data={paginatedData}
        columns={divisionColumns}
        display={{
          title: "Divisions",
          emptyStateText: "No divisions found",
          buttonText: "Add Division",
        }}
        actions={{
          onAdd: handleAdd,
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
        search={{
          initialSearch: query,
          searchable: true,
          onSearch: handleSearch,
        }}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: handlePageChange,
        }}
      />

      <DivisionModal
        isOpen={open}
        onClose={handleClose}
        initialData={selectedData}
      />
    </>
  );
}
