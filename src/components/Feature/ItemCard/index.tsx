import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../routes/routes";
import { Modal } from "../../UI/Modal";
import { LabelText } from "../../UI/LabelText";
import { ItemCardProps } from "./types";
import { listItemService } from "../../../services/listService";
import noLogo from "../../../assets/nologo.png";

export function ItemCard({ listId, item }: ItemCardProps) {
  const navigate = useNavigate();
  const { token, isAuthenticated, logout } = useAuth();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [removeMode, setRemoveMode] = useState<boolean>(false);
  const [expandMode, setExpandMode] = useState<boolean>(true);

  const [newTitle, setNewTitle] = useState<string>(item.title);
  const [newSeason, setNewSeason] = useState<number>(item.season);
  const [newEpisode, setNewEpisode] = useState<number>(item.episode);
  const [newChapter, setNewChapter] = useState<number>(item.chapter || 0);
  const [newLink, setNewLink] = useState<string>(item.link);
  const [newImage, setNewImage] = useState<string>(item.image);

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

  const handleCancelRemove = () => setRemoveMode(false);
  const handleRemoveEvent = async () => {
    const response = await listItemService.deleteListItemById(
      listId,
      item.id,
      token
    );

    if (!response) {
      logout();
    }
  };

  return (
    <div className="h-52 flex flex-col justify-between border-b bg-white mb-6 sm:flex-row sm:mb-0 sm:h-36">
      <div className="h-4/5 flex items-center mb-4 sm:h-full">
        <img
          className="h-full"
          src={item.image || noLogo}
          alt={`${item.title} image`}
        />

        <div className="pl-5 text-sm sm:flex sm:flex-col sm:text-lg">
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

              <a
                className="text-gray-700 hover:underline hover:text-black"
                href={item.link}
                target="_blank"
              >
                Direct Link
              </a>
            </>
          )}
        </div>
      </div>

      {editMode && (
        <Modal
          modalTitle="Edit Item"
          fields={editFields}
          cancelLabel="Cancel"
          confirmLabel="Save"
          onClose={handleCancelEdit}
          onSave={handleSaveEvent}
        />
      )}

      {removeMode && (
        <Modal
          modalTitle="Remove Item"
          subtitle="Are you sure you want to remove this Item from the list?"
          cancelLabel="Cancel"
          confirmLabel="Remove"
          onClose={handleCancelRemove}
          onSave={handleRemoveEvent}
        />
      )}

      <div className="h-1/5 flex items-center justify-between sm:flex-col sm:justify-evenly sm:mr-3 sm:h-full">
        <button
          className="w-1/2 bg-gray-500 text-white py-1 hover:bg-gray-400 sm:w-full sm:px-2"
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
        <button
          className="w-1/2 bg-gray-900 text-white py-1 hover:bg-gray-800 sm:w-full sm:px-2"
          onClick={() => setRemoveMode(true)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
