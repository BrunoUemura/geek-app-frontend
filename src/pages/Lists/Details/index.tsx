import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Items } from "../../../components/Feature/Items";
import { ListHeader } from "../../../components/Feature/ListHeader";
import { Button } from "../../../components/UI/Button";
import { Modal } from "../../../components/UI/Modal";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../routes/routes";
import { listItemService, listService } from "../../../services/listService";
import { ILists } from "../../../types/ILists";
import "./styles.scss";

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [list, setList] = useState<ILists | null>(listInitialState);

  const [title, setTitle] = useState<string>("");
  const [season, setSeason] = useState<number>(0);
  const [episode, setEpisode] = useState<number>(0);
  const [chapter, setChapter] = useState<number>(0);
  const [link, setLink] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const baseClass = "list-details-container";

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

    inputsCleanUp();

    if (!response) {
      logout();
    }
  };

  const handleCancelNewList = () => setIsModalOpen(false);

  useEffect(() => {
    if (!isAuthenticated) return navigate(ROUTES.LOGIN, { replace: true });

    (async () => {
      const result = await listService.fetchListByListId(id || "", token || "");

      setList(result);

      if (!result) {
        logout();
      }
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
    <div className={baseClass}>
      <ListHeader list={list} />

      <Button label="Add Item" onClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <Modal
          modalTitle="New List"
          fields={modalProps}
          cancelLabel="Cancel"
          confirmLabel="Save"
          onClose={handleCancelNewList}
          onSave={handleAddEvent}
        />
      )}

      <Items items={list.listItem} />
    </div>
  );
}
