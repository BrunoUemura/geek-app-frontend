import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ListHeaderProps } from "./types";
import { ROUTES } from "../../../routes/routes";
import { listService } from "../../../services/listService";
import { useAuth } from "../../../hooks/useAuth";
import { LabelText } from "../../UI/LabelText";
import { Modal } from "../../UI/Modal";
import { formatDate } from "../../../utils/functions";

export function ListHeader({ list }: ListHeaderProps) {
  const { id, title, category, description, listItem, createdAt, updatedAt } =
    list;

  const navigate = useNavigate();
  const { token, isAuthenticated, logout } = useAuth();

  const [isAwaitingSave, setIsAwaitingSave] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [removeMode, setRemoveMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newCategory, setNewCategory] = useState<string>(category);
  const [newDescription, setNewDescription] = useState<string>(description);

  const editFields = [
    {
      label: "Title",
      inputType: "text",
      inputValue: newTitle,
      setState: setNewTitle,
    },
    {
      label: "Category",
      inputType: "text",
      inputValue: newCategory,
      setState: setNewCategory,
    },
    {
      label: "Description",
      fieldType: "textarea",
      inputType: "text",
      inputValue: newDescription,
      setState: setNewDescription,
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setNewTitle(title);
    setNewCategory(category);
    setNewDescription(description);
  }, [title, category, description]);

  const handleCancelEdit = () => setEditMode(false);
  const handleSaveEvent = async () => {
    setIsAwaitingSave(true);
    const response = await listService.updateList(
      id,
      newTitle,
      newCategory,
      newDescription,
      token
    );

    setIsAwaitingSave(false);

    if (!response) {
      logout();
    }

    navigate(0);
  };

  const handleCancelRemove = () => setRemoveMode(false);
  const handleRemoveEvent = async () => {
    setIsAwaitingSave(true);
    const response = await listService.deleteList(id, token);

    setIsAwaitingSave(false);

    if (!response) {
      logout();
    }

    navigate(ROUTES.LIST, { replace: true });
  };

  return (
    <div className="flex flex-col justify-center bg-white sm:flex-row sm:justify-between">
      <div className="flex flex-col p-3">
        <div className="text-2xl mb-4 tracking-wide">{title}</div>
        <LabelText label="Category" text={category} />
        <LabelText label="Description" text={description} />
        <LabelText label="Total Items" text={String(listItem.length)} />
        <LabelText label="Created At" text={formatDate(createdAt)} />
        <LabelText label="Updated At" text={formatDate(updatedAt)} />
      </div>

      {editMode && (
        <Modal
          modalTitle="Edit List Details"
          fields={editFields}
          cancelLabel="Cancel"
          confirmLabel="Save"
          isAwaitingSave={isAwaitingSave}
          onClose={handleCancelEdit}
          onSave={handleSaveEvent}
        />
      )}

      {removeMode && (
        <Modal
          modalTitle="Remove List"
          subtitle="Are you sure you want to remove this List?"
          cancelLabel="Cancel"
          confirmLabel="Remove"
          isAwaitingSave={isAwaitingSave}
          onClose={handleCancelRemove}
          onSave={handleRemoveEvent}
        />
      )}

      <div className="flex items-center justify-between sm:flex-col sm:justify-evenly sm:mr-3">
        <button
          className="w-1/2 bg-gray-500 text-white py-1 sm:w-full sm:px-2"
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
        <button
          className="w-1/2 bg-gray-900 text-white py-1 sm:w-full sm:px-2"
          onClick={() => setRemoveMode(true)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
