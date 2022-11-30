import { useState } from "react";
import ReactModal from "react-modal";
import { LoaderSpinner } from "../Loader";

import { ModalProps } from "./types";
import { customStyles } from "./utils";

export function Modal({
  modalTitle,
  subtitle,
  fields,
  cancelLabel,
  confirmLabel,
  isAwaitingSave = false,
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
    <div className="">
      <ReactModal
        // className="flex flex-col top-1/2 left-1/2 right-auto bottom-auto p-10 border border-gray-600 bg-white"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        ariaHideApp={false}
      >
        <h2 className="font-semibold text-2xl mb-3">{modalTitle}</h2>
        {subtitle && <h3>{subtitle}</h3>}

        <div className="mb-4">
          {fields?.map((field, index) => (
            <div key={index} className="flex justify-between mb-1 p-1">
              <label>{field.label}:&nbsp;</label>
              {field?.fieldType === "textarea" ? (
                <textarea
                  className="px-2 bg-white"
                  defaultValue={field.inputValue}
                  onChange={(event) => field.setState(event.target.value)}
                ></textarea>
              ) : (
                <input
                  className="px-2 bg-white"
                  type={field.inputType}
                  value={field.inputValue}
                  onChange={(event) => field.setState(event.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        <div className="w-full h-9 flex justify-between text-center">
          {isAwaitingSave ? (
            <>
              <button
                className="w-1/2 flex justify-center items-center text-white bg-blue-900"
                disabled={true}
                onClick={handleSaveEvent}
              >
                <LoaderSpinner
                  width={20}
                  height={20}
                  strokeWidth={8}
                  strokeWidthSecondary={8}
                  primaryColor={"#c7c7c7"}
                  secondaryColor={"#a3a3a3"}
                />
              </button>
              <button
                className="w-1/2 bg-black text-white"
                onClick={closeModal}
                disabled={true}
              >
                {cancelLabel}
              </button>
            </>
          ) : (
            <>
              <button
                className="w-1/2 bg-gray-600 text-white hover:bg-blue-900"
                onClick={handleSaveEvent}
              >
                {confirmLabel}
              </button>
              <button
                className="w-1/2 bg-black text-white hover:bg-red-900"
                onClick={closeModal}
              >
                {cancelLabel}
              </button>
            </>
          )}
        </div>
      </ReactModal>
    </div>
  );
}
