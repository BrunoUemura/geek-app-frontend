import { useState } from "react";
import ReactModal from "react-modal";

import { ModalProps } from "./types";
import { customStyles } from "./utils";

export function Modal({
  modalTitle,
  subtitle,
  fields,
  cancelLabel,
  confirmLabel,
  onClose,
  onSave,
}: ModalProps) {
  const [modalIsOpen, setIsOpen] = useState(true);

  const baseClass = "modal-container";
  const classFields = `${baseClass}__modal-fields`;

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const handleSaveEvent = async () => {
    await onSave();
    closeModal();
  };

  return (
    <div className={baseClass}>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        ariaHideApp={false}
      >
        <h2>{modalTitle}</h2>
        {subtitle && <h3>{subtitle}</h3>}

        <div className={classFields}>
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
      </ReactModal>
    </div>
  );
}
