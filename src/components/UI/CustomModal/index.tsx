import { useState } from "react";
import { ModalProps } from "../Modal/types";
import "./styles.scss";

export default function CustomModal({
  modalTitle,
  subtitle,
  fields,
  cancelLabel,
  confirmLabel,
  onClose,
  onSave,
}: ModalProps) {
  const [modalIsOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const handleSaveEvent = async () => {
    await onSave();
    closeModal();
  };

  return (
    <div className="modal-container">
      <h2>{modalTitle}</h2>
      {subtitle && <h3>{subtitle}</h3>}

      <div className="">
        {fields?.map((field, index) => (
          <div key={index} className="modal-container__inputs">
            <label>{field.label}:&nbsp;</label>
            {field?.fieldType === "textarea" ? (
              <textarea
                defaultValue={field.inputValue}
                onChange={(event) => field.setState(event.target.value)}
              ></textarea>
            ) : (
              <input
                type={field.inputType}
                value={field.inputValue}
                onChange={(event) => field.setState(event.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <button onClick={closeModal}>{cancelLabel}</button>
      <button onClick={handleSaveEvent}>{confirmLabel}</button>
    </div>
  );
}
