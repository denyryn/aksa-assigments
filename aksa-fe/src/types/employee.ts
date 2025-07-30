import type { Division } from "./division";

export type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  division: Division;
};
