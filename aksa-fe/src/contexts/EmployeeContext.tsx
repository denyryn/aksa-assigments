import React, { createContext, useContext, useState, useEffect } from "react";
import type { Employee } from "../types/employee";

type EmployeeContextType = {
  employees: Employee[] | null;
  totalEmployees: number;
  search: (query: string) => Employee[];
  create: (newEmployee: Employee) => void;
  update: (id: string, updates: Partial<Employee>) => void;
  remove: (id: string) => void;
};

const EmployeeContext = createContext<EmployeeContextType | null>(null);

const EMPLOYEE_KEY = "employee_data";

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<Employee[] | null>(() => {
    const raw = localStorage.getItem(EMPLOYEE_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employees));
  }, [employees]);

  const totalEmployees = employees?.length || 0;

  const search = (query: string): Employee[] => {
    if (!employees) return [];
    if (query === "") return employees;
    return employees.filter((emp) =>
      emp.name.toLowerCase().includes(query.toLowerCase().trim())
    );
  };

  const create = (newEmployee: Employee) => {
    const updated = employees ? [...employees, newEmployee] : [newEmployee];
    setEmployees(updated);
  };

  const update = (id: string, updates: Partial<Employee>) => {
    if (!employees) return;
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, ...updates } : emp
    );
    setEmployees(updated);
  };

  const remove = (id: string) => {
    if (!employees) return;
    const updated = employees.filter((emp) => emp.id !== id);
    setEmployees(updated);
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, create, update, remove, totalEmployees, search }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export function useEmployee(): EmployeeContextType {
  const context = useContext(EmployeeContext);
  if (!context)
    throw new Error("useEmployee must be used inside EmployeeProvider");
  return context;
}
