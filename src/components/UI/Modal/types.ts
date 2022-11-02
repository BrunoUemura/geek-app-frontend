import { SetStateAction } from "react";

export interface ModalProps {
  modalTitle: string;
  subtitle?: string;
  fields?: ModalFields[];
  cancelLabel: string;
  confirmLabel: string;
  onClose: () => void;
  onSave: () => Promise<void>;
}

interface ModalFields {
  label: string;
  fieldType?: string;
  inputType: string;
  inputValue: string | number;
  setState: (value: SetStateAction<any>) => void;
}
