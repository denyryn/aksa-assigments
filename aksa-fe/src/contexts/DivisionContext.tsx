import React, { createContext, useContext, useState, useEffect } from "react";
import type { Division } from "../types/division";

type DivisionContextType = {
  divisions: Division[] | null;
  totalDivisions: number;
  search: (query: string) => Division[];
  create: (division: Division) => void;
  update: (id: string, updates: Partial<Division>) => void;
  remove: (id: string) => void;
};

const DivisionContext = createContext<DivisionContextType | null>(null);

const DIVISION_KEY = "division_data";

export const DivisionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [divisions, setDivisions] = useState<Division[] | null>(() => {
    const raw = localStorage.getItem(DIVISION_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    localStorage.setItem(DIVISION_KEY, JSON.stringify(divisions));
  }, [divisions]);

  const totalDivisions = divisions?.length ?? 0;

  const search = (query: string): Division[] => {
    if (!divisions) return [];
    if (query === "") return divisions;
    return divisions.filter((div) =>
      div.name.toLowerCase().includes(query.toLowerCase().trim())
    );
  };

  const create = (division: Division) => {
    const updated = divisions ? [...divisions, division] : [division];
    setDivisions(updated);
  };

  const update = (id: string, updates: Partial<Division>) => {
    if (!divisions) return;
    const updated = divisions.map((div) =>
      div.id === id ? { ...div, ...updates } : div
    );
    setDivisions(updated);
  };

  const remove = (id: string) => {
    if (!divisions) return;
    const updated = divisions.filter((div) => div.id !== id);
    setDivisions(updated);
  };

  return (
    <DivisionContext.Provider
      value={{ divisions, search, create, update, remove, totalDivisions }}
    >
      {children}
    </DivisionContext.Provider>
  );
};

export function useDivision(): DivisionContextType {
  const context = useContext(DivisionContext);
  if (!context)
    throw new Error("useDivision must be used inside DivisionProvider");
  return context;
}
