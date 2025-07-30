import { useState, useEffect, useMemo } from "react";
import DataTable from "@/components/DataTable";
import { useEmployee } from "@/contexts/EmployeeContext";
import type { Employee } from "@/types/employee";
import type { ColumnDefinition } from "@/components/DataTable";
import EmployeeModal from "./EmployeeModal";
import { useDebounce } from "@/hooks/UseDebounce";
import { useQueryParam, usePageParam } from "@/hooks/UseQueryParams";

const employeeColumns: ColumnDefinition<Employee>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "position", header: "Position" },
  {
    key: "division",
    header: "Division",
    render: (employee) => employee.division?.name || "—",
  },
];

const PAGE_SIZE = 5;

export default function EmployeeTable() {
  const { employees, remove, search } = useEmployee();

  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Employee | null>(null);
  const [filtered, setFiltered] = useState<Employee[]>(employees || []);

  const [query, setQuery] = useQueryParam("emp", "");
  const [currentPage, setCurrentPage] = usePageParam("emp_page", 1);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const result = search(debouncedQuery);
    setFiltered(result);
    setCurrentPage(1); // Reset to first page on new search
  }, [debouncedQuery, search]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filtered.length / PAGE_SIZE);
  }, [filtered]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  const handleAdd = () => {
    setSelectedData(null);
    setOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedData(employee);
    setOpen(true);
  };

  const handleRemove = (employee: Employee) => {
    remove(employee.id);
  };

  return (
    <>
      <DataTable
        data={paginatedData}
        columns={employeeColumns}
        display={{
          title: "Employees",
          emptyStateText: "No employees found",
          buttonText: "Add Employee",
        }}
        actions={{
          onAdd: handleAdd,
          onEdit: handleEdit,
          onDelete: handleRemove,
        }}
        search={{
          searchable: true,
          initialSearch: query,
          onSearch: handleSearch,
        }}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: handlePageChange,
        }}
      />

      <EmployeeModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialData={selectedData}
      />
    </>
  );
}
