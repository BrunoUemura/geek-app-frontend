import { SetStateAction } from "react";

export interface ModalProps {
  modalTitle: string;
  fields: ModalFields[];
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
