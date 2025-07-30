import { useState, useEffect } from "react";
import type { Employee } from "../../../../types/employee";
import type { Division } from "../../../../types/division";
import { v4 as uuidv4 } from "uuid";

type Props = {
  initialData?: Employee | null;
  onSubmit: (data: Employee) => void;
  submitLabel?: string;
  divisions: Division[]; // 🔹 Add this prop
};

export default function EmployeeForm({
  initialData = null,
  onSubmit,
  submitLabel = "Save",
  divisions,
}: Props) {
  const isEdit = !!initialData;

  const [form, setForm] = useState<Employee>({
    id: "",
    name: "",
    email: "",
    phone: "",
    position: "",
    division: { id: "", name: "" },
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = divisions.find((d) => d.id === e.target.value);
    if (selected) {
      setForm({
        ...form,
        division: selected,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Employee = {
      ...form,
      id: initialData?.id || uuidv4(),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">{isEdit ? "Edit" : "Add"} Employee</h2>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Position</label>
        <input
          name="position"
          value={form.position}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Division</label>
        <select
          value={form.division.id}
          onChange={handleDivisionChange}
          className="border rounded px-3 py-2 w-full"
          required
        >
          <option value="" disabled>
            Select Division
          </option>
          {divisions.map((division) => (
            <option key={division.id} value={division.id}>
              {division.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
