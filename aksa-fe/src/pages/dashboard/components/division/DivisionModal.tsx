import { Modal, type ModalProps } from "../../../../components/Modals";
import DivisionForm from "./DivisionForm";
import { useDivision } from "../../../../contexts/DivisionContext";
import type { Division } from "../../../../types/division";

type DivisionModalProps = Omit<ModalProps, "children"> & {
  initialData?: Division | null;
};

export default function DivisionModal(props: DivisionModalProps) {
  const { create, update } = useDivision();
  const { initialData, onClose } = props;

  const handleSubmit = (data: Division) => {
    if (initialData) {
      update(initialData.id, { name: data.name });
    } else {
      create(data);
    }
    onClose?.();
  };

  return (
    <Modal {...props}>
      <DivisionForm onSubmit={handleSubmit} initialData={initialData} />
    </Modal>
  );
}
