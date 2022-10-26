import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../routes/routes";
import { IListItem } from "../../types/ILists";
import { LabelText } from "../UI/LabelText";
import "./styles.scss";

export function ItemCard(item: IListItem) {
  const navigate = useNavigate();
  const { token, isAuthenticated, logout } = useAuth();

  const [editMode, setEditMode] = useState<boolean>(false);
  // const [newTitle, setNewTitle] = useState<string>(title);
  // const [newCategory, setNewCategory] = useState<string>(category);
  // const [newDescription, setNewDescription] = useState<string>(description);

  const baseClass = "item-card-component";
  const classDetails = `${baseClass}__details`;
  const classDetailsInfo = `${classDetails}__info`;
  const classActions = `${baseClass}__actions`;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isAuthenticated]);

  // if (editMode) {
  //   return <Modal />;
  // }

  return (
    <div className={baseClass}>
      <div className={classDetails}>
        <img src={item.image} alt={`${item.title} image`} />

        <div className={classDetailsInfo}>
          <LabelText label="Title" text={item.title} />
          <LabelText label="Season" text={String(item.season)} />

          {item?.episode && (
            <LabelText label="Episode" text={String(item.episode)} />
          )}

          {item?.chapter && (
            <LabelText label="Chapter" text={String(item.chapter)} />
          )}

          <a href={item.link}>Direct Link</a>
        </div>
      </div>

      <div className={classActions}>
        <button onClick={() => setEditMode(true)}>edit</button>
        <button>remove</button>
      </div>
    </div>
  );
}
