import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ListHeader } from "../../../components/Feature/ListHeader";
import { Button } from "../../../components/UI/Button";
import { Modal } from "../../../components/UI/Modal";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../routes/routes";
import { listItemService, listService } from "../../../services/listService";
import { ILists } from "../../../types/ILists";
import { RenderItems } from "./RenderItems";

const listInitialState = {
  id: "",
  userId: "",
  title: "",
  category: "",
  description: "",
  listItem: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function ListsDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, logout, token } = useAuth();

  const [isAwaitingSave, setIsAwaitingSave] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [list, setList] = useState<ILists | null>(listInitialState);

  const [title, setTitle] = useState<string>("");
  const [season, setSeason] = useState<number>(0);
  const [episode, setEpisode] = useState<number>(0);
  const [chapter, setChapter] = useState<number>(0);
  const [link, setLink] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const modalProps = [
    {
      label: "Title",
      inputType: "text",
      inputValue: title,
      setState: setTitle,
    },
    {
      label: "Season",
      inputType: "number",
      inputValue: season,
      setState: setSeason,
    },
    {
      label: "Episode",
      inputType: "number",
      inputValue: episode,
      setState: setEpisode,
    },
    {
      label: "Chapter",
      inputType: "number",
      inputValue: chapter,
      setState: setChapter,
    },
    {
      label: "Link",
      inputType: "text",
      inputValue: link,
      setState: setLink,
    },
    {
      label: "Image",
      inputType: "text",
      inputValue: image,
      setState: setImage,
    },
  ];

  const inputsCleanUp = () => {
    setTitle("");
    setSeason(0);
    setEpisode(0);
    setChapter(0);
    setLink("");
    setImage("");
  };

  const handleAddEvent = async () => {
    setIsAwaitingSave(true);
    const response = await listItemService.createListItem(
      list?.id,
      title,
      season,
      episode,
      chapter,
      link,
      image,
      token
    );

    setIsAwaitingSave(false);
    inputsCleanUp();

    if (!response) {
      logout();
    }

    navigate(0);
  };

  const handleCancelNewList = () => setIsModalOpen(false);

  useEffect(() => {
    if (!isAuthenticated) return navigate(ROUTES.LOGIN, { replace: true });

    (async () => {
      const result = await listService.fetchListByListId(id || "", token || "");

      if (!result) {
        logout();
        return;
      }

      setList(result);
      setIsLoading(!isLoading);
    })();
  }, [isAuthenticated]);

  if (!list) {
    return (
      <div>
        <span>No List found for id {id}</span>
        <Link to={ROUTES.LIST}>
          <button>Go back</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen p-10">
      <ListHeader list={list} />

      <div className="mt-8 mb-4">
        <Button label="Add Item" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <Modal
          modalTitle="New Item"
          fields={modalProps}
          cancelLabel="Cancel"
          confirmLabel="Save"
          isAwaitingSave={isAwaitingSave}
          onClose={handleCancelNewList}
          onSave={handleAddEvent}
        />
      )}

      <RenderItems isLoading={isLoading} items={list.listItem} />
    </div>
  );
}
