import { useState } from "react";

import { useAuth } from "../../../hooks/useAuth";
import { Modal } from "../../UI/Modal";
import { listItemService } from "../../../services/http/list";
import { IListItem } from "../../../@types/ILists";

export interface ItemCardProps {
  listId: string;
  item: IListItem;
}

export function ItemOwnerView({ listId, item }: ItemCardProps) {
  const { token, isAuthenticated, logout } = useAuth();

  const [isAwaitingSave, setIsAwaitingSave] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [removeMode, setRemoveMode] = useState<boolean>(false);

  const [newTitle, setNewTitle] = useState<string>(item.title);
  const [newSeason, setNewSeason] = useState<number>(item.season);
  const [newEpisode, setNewEpisode] = useState<number>(item.episode);
  const [newChapter, setNewChapter] = useState<number>(item.chapter || 0);
  const [status, setStatus] = useState<string>(item.status);
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
      label: "Status",
      inputType: "status",
      inputValue: status,
      setState: setStatus,
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

  const handleCancelEdit = () => setEditMode(false);
  const handleSaveEvent = async () => {
    setIsAwaitingSave(true);

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

    setIsAwaitingSave(false);

    if (!response) {
      logout();
    }

    location.reload();
  };

  const handleCancelRemove = () => setRemoveMode(false);
  const handleRemoveEvent = async () => {
    setIsAwaitingSave(true);
    const response = await listItemService.deleteListItemById(
      listId,
      item.id,
      token
    );

    setIsAwaitingSave(false);

    if (!response) {
      logout();
    }

    location.reload();
  };

  if (!isAuthenticated) return null;

  return (
    <>
      {editMode && (
        <Modal
          modalTitle="Edit Item"
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
          modalTitle="Remove Item"
          subtitle="Are you sure you want to remove this Item from the list?"
          cancelLabel="Cancel"
          confirmLabel="Remove"
          isAwaitingSave={isAwaitingSave}
          onClose={handleCancelRemove}
          onSave={handleRemoveEvent}
        />
      )}

      <div className="h-1/5 flex items-center justify-between sm:flex-col sm:justify-evenly sm:mr-3 sm:h-full">
        <button
          className="w-1/2 h-full bg-neutral-500 text-white py-1 hover:bg-neutral-400 sm:w-full sm:h-8 sm:px-2"
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
        <button
          className="w-1/2 h-full bg-neutral-900 text-white py-1 hover:bg-neutral-800 sm:w-full sm:h-8 sm:px-2"
          onClick={() => setRemoveMode(true)}
        >
          Remove
        </button>
      </div>
    </>
  );
}
