import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ListHeaderProps } from "./types";
import { ROUTES } from "../../../routes/routes";
import { listService } from "../../../services/listService";
import { useAuth } from "../../../hooks/useAuth";
import { LabelText } from "../../UI/LabelText";
import { Modal } from "../../UI/Modal";
import { formatDate } from "../../../utils/functions";
import "./styles.scss";

export function ListHeader({ list }: ListHeaderProps) {
  const { id, title, category, description, listItem, createdAt, updatedAt } =
    list;

  const navigate = useNavigate();
  const { token, isAuthenticated, logout } = useAuth();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [removeMode, setRemoveMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newCategory, setNewCategory] = useState<string>(category);
  const [newDescription, setNewDescription] = useState<string>(description);

  const baseClass = "list-header-container";
  const classDetails = `${baseClass}__details`;
  const classDetailsElements = `${classDetails}__elements`;
  const classActions = `${baseClass}__actions`;

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
    const response = await listService.updateList(
      id,
      newTitle,
      newCategory,
      newDescription,
      token
    );

    if (!response) {
      logout();
    }
  };

  const handleCancelRemove = () => setRemoveMode(false);
  const handleRemoveEvent = async () => {
    const response = await listService.deleteList(id, token);

    if (!response) {
      logout();
    }
  };

  return (
    <div className={baseClass}>
      <div className={classDetails}>
        <div className={`${classDetails}__title`}>{title}</div>
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
          onClose={handleCancelRemove}
          onSave={handleRemoveEvent}
        />
      )}

      <div className={classActions}>
        <button onClick={() => setEditMode(true)}>edit</button>
        <button onClick={() => setRemoveMode(true)}>remove</button>
      </div>
    </div>
  );
}
