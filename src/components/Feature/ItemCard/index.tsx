import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../routes/routes";
import { Modal } from "../../UI/Modal";
import { LabelText } from "../../UI/LabelText";
import { ItemCardProps } from "./types";
import "./styles.scss";
import { listItemService } from "../../../services/listService";

export function ItemCard({ listId, item }: ItemCardProps) {
  const navigate = useNavigate();
  const { token, isAuthenticated, logout } = useAuth();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [expandMode, setExpandMode] = useState<boolean>(true);

  const [newTitle, setNewTitle] = useState<string>(item.title);
  const [newSeason, setNewSeason] = useState<number>(item.season);
  const [newEpisode, setNewEpisode] = useState<number>(item.episode);
  const [newChapter, setNewChapter] = useState<number>(item.chapter || 0);
  const [newLink, setNewLink] = useState<string>(item.link);
  const [newImage, setNewImage] = useState<string>(item.image);

  const baseClass = "item-card-component";
  const classDetails = `${baseClass}__details`;
  const classDetailsInfo = `${classDetails}__info`;
  const classDetailsInfoCollapsed = `${classDetails}__info_collapsed`;
  const classDetailsInfoExpanded = `${classDetails}__info_expanded`;
  const classActions = `${baseClass}__actions`;

  const editFields = [
    {
      label: "Title",
      inputType: "text",
      inputValue: newTitle,
      setState: setNewTitle,
    },
    {
      label: "Season",
      inputType: "number",
      inputValue: newSeason,
      setState: setNewSeason,
    },
    {
      label: "Episode",
      inputType: "number",
      inputValue: newEpisode,
      setState: setNewEpisode,
    },
    {
      label: "Chapter",
      inputType: "number",
      inputValue: newChapter,
      setState: setNewChapter,
    },
    {
      label: "Link",
      inputType: "text",
      inputValue: newLink,
      setState: setNewLink,
    },
    {
      label: "Image",
      inputType: "text",
      inputValue: newImage,
      setState: setNewImage,
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isAuthenticated]);

  const handleCancelEdit = () => setEditMode(false);

  const handleSaveEvent = async () => {
    const response = await listItemService.updateListItem(
      item.id,
      listId,
      newTitle,
      newSeason,
      newEpisode,
      newChapter,
      newLink,
      newImage,
      token || ""
    );

    if (!response) {
      logout();
    }
  };

  const handleDeleteEvent = async () => {
    const response = await listItemService.deleteListItemById(item.id, token);

    if (!response) {
      logout();
    }
  };

  return (
    <div className={baseClass}>
      <div className={classDetails}>
        <img src={item.image} alt={`${item.title} image`} />

        <div className={classDetailsInfo}>
          <LabelText label="Title" text={item.title} />

          {expandMode && (
            <>
              <LabelText label="Season" text={String(item.season)} />

              {item?.episode ? (
                <LabelText label="Episode" text={String(item.episode)} />
              ) : null}

              {item?.chapter ? (
                <LabelText label="Chapter" text={String(item.chapter)} />
              ) : null}

              <a href={item.link}>Direct Link</a>
            </>
          )}
        </div>
      </div>

      {editMode ? (
        <Modal
          modalTitle="Edit Item"
          fields={editFields}
          cancelLabel="Cancel"
          confirmLabel="Save"
          onClose={handleCancelEdit}
          onSave={handleSaveEvent}
        />
      ) : (
        <div className={classActions}>
          <button onClick={() => setEditMode(true)}>edit</button>
          <button onClick={handleDeleteEvent}>remove</button>
        </div>
      )}
    </div>
  );
}
