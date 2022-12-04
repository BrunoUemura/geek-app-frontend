import { useState } from "react";
import Router from "next/router";

import { ROUTES } from "../../../constants/routes";
import { listService } from "../../../services/http/list";
import { useAuth } from "../../../hooks/useAuth";
import { Modal } from "../../UI/Modal";
import { ILists } from "../../../@types/ILists";

interface ListHeaderProps {
  list: ILists;
}

export function ListHeaderOwnerView({ list }: ListHeaderProps) {
  const { id, title, category, description } = list;

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

    location.reload();
  };

  const handleCancelRemove = () => setRemoveMode(false);
  const handleRemoveEvent = async () => {
    setIsAwaitingSave(true);
    const response = await listService.deleteList(id, token);

    setIsAwaitingSave(false);

    if (!response) {
      logout();
    }

    Router.push(ROUTES.ROOT);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
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
          className="w-1/2 bg-neutral-500 text-white py-1 sm:w-full sm:px-2 hover:bg-neutral-400"
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
        <button
          className="w-1/2 bg-neutral-900 text-white py-1 sm:w-full sm:px-2 hover:bg-neutral-800"
          onClick={() => setRemoveMode(true)}
        >
          Remove
        </button>
      </div>
    </>
  );
}
