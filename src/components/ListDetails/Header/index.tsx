import { ListHeaderProps } from "./types";
import "./styles.scss";
import { ROUTES } from "../../../routes/routes";
import { useCallback, useEffect, useState } from "react";
import { listService } from "../../../services/listService";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LabelText } from "../../UI/LabelText";

export function ListHeader({
  id,
  title,
  category,
  description,
  itemsQuantity,
  createdAt,
  updatedAt,
}: ListHeaderProps) {
  const navigate = useNavigate();
  const { token, isAuthenticated, logout } = useAuth();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newCategory, setNewCategory] = useState<string>(category);
  const [newDescription, setNewDescription] = useState<string>(description);

  const baseClass = "list-header-container";
  const classDetails = `${baseClass}__details`;
  const classDetailsElements = `${classDetails}__elements`;
  const classActions = `${baseClass}__actions`;

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

  const handleSaveEdit = async () => {
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

  if (editMode) {
    return (
      <div className={baseClass}>
        <div className={classDetails}>
          <div className={classDetailsElements}>
            <span className={`${classDetailsElements}__label`}>
              Title:&nbsp;
            </span>
            <input
              className={`${classDetailsElements}__input`}
              type="text"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </div>

          <div className={classDetailsElements}>
            <span className={`${classDetailsElements}__label`}>
              Category:&nbsp;
            </span>
            <input
              className={`${classDetailsElements}__input`}
              type="text"
              value={newCategory}
              onChange={(event) => setNewCategory(event.target.value)}
            />
          </div>

          <div className={classDetailsElements}>
            <span className={`${classDetailsElements}__label`}>
              Description:&nbsp;
            </span>
            <textarea
              className={`${classDetailsElements}__textarea`}
              onChange={(event) => setNewDescription(event.target.value)}
              defaultValue={newDescription}
            ></textarea>
          </div>

          <div className={classDetailsElements}>
            <span className={`${classDetailsElements}__label`}>
              Total Items:&nbsp;
            </span>
            <span className={`${classDetailsElements}__text`}>
              {itemsQuantity}
            </span>
          </div>

          <div className={classDetailsElements}>
            <span className={`${classDetailsElements}__label`}>
              Created At:&nbsp;
            </span>
            <span className={`${classDetailsElements}__text`}>{createdAt}</span>
          </div>

          <div className={classDetailsElements}>
            <span className={`${classDetailsElements}__label`}>
              Updated At:&nbsp;
            </span>
            <span className={`${classDetailsElements}__text`}>{updatedAt}</span>
          </div>
        </div>

        <div className={classActions}>
          <button onClick={handleSaveEdit}>save</button>
          <button onClick={() => setEditMode(false)}>cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={baseClass}>
      <div className={classDetails}>
        <div className={`${classDetails}__title`}>{title}</div>
        <LabelText label="Category" text={category} />
        <LabelText label="Description" text={description} />
        <LabelText label="Total Items" text={String(itemsQuantity)} />
        <LabelText label="Created At" text={createdAt} />
        <LabelText label="Updated At" text={updatedAt} />
      </div>

      <div className={classActions}>
        <button onClick={() => setEditMode(true)}>edit</button>
        <button>remove</button>
      </div>
    </div>
  );
}
