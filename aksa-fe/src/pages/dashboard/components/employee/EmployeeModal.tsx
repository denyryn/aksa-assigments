import { Modal, type ModalProps } from "../../../../components/Modals";
import EmployeeForm from "./EmployeeForm";
import { useEmployee } from "../../../../contexts/EmployeeContext";
import { useDivision } from "../../../../contexts/DivisionContext";
import type { Employee } from "../../../../types/employee";

type EmployeeModalProps = Omit<ModalProps, "children"> & {
  initialData?: Employee | null;
};

export default function EmployeeModal({
  initialData = null,
  onClose,
  ...props
}: EmployeeModalProps) {
  const { create, update } = useEmployee();
  const { divisions } = useDivision();

  const handleSubmit = (data: Employee) => {
    if (initialData) {
      update(initialData.id, data);
    } else {
      create(data);
    }
    onClose?.();
  };

  return (
    <Modal {...props} onClose={onClose}>
      <EmployeeForm
        divisions={divisions || []}
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel={initialData ? "Update" : "Create"}
      />
    </Modal>
  );
}
