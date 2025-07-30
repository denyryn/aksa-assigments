// components/UserEditModal.tsx
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { Modal } from "./Modals";

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserEditModal({ isOpen, onClose }: UserEditModalProps) {
  const { user, update } = useUser();
  const [formData, setFormData] = useState({ username: "" });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
      });
    }
  }, [user, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-background"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
