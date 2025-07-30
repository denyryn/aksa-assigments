import { useState, useEffect } from "react";
import type { Division } from "../../../../types/division";
import { v4 as uuidv4 } from "uuid";

type Props = {
  initialData?: Division | null;
  onSubmit: (data: Division) => void;
  submitLabel?: string;
};

export default function DivisionForm({
  initialData = null,
  onSubmit,
  submitLabel = "Save",
}: Props) {
  const isEdit = !!initialData;

  const [name, setName] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Division = {
      id: initialData?.id || uuidv4(),
      name,
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">
        {isEdit ? "Edit" : "Create"} Division
      </h2>

      <div>
        <label className="block text-sm font-medium">Division Name</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
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
