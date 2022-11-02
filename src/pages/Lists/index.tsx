import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { List } from "../../components/Feature/List";
import { ILists } from "../../types/ILists";
import { listService } from "../../services/listService";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../routes/routes";
import { Button } from "../../components/UI/Button";
import { Modal } from "../../components/UI/Modal";
import "./styles.scss";

export function Lists() {
  const navigate = useNavigate();
  const { isAuthenticated, id, token, logout } = useAuth();

  const [lists, setLists] = useState<ILists[] | null>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const modalProps = [
    {
      label: "Title",
      inputType: "text",
      inputValue: title,
      setState: setTitle,
    },
    {
      label: "Category",
      inputType: "text",
      inputValue: category,
      setState: setCategory,
    },
    {
      label: "Description",
      inputType: "text",
      inputValue: description,
      setState: setDescription,
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) return navigate(ROUTES.LOGIN, { replace: true });

    (async () => {
      const response = await listService.fetchListByUserId(id, token);

      setLists(response);

      if (!response) {
        logout();
      }
    })();
  }, [isAuthenticated]);

  const inputsCleanUp = () => {
    setTitle("");
    setCategory("");
    setDescription("");
  };

  const handleSaveEvent = async () => {
    console.log("Save clicked");
    inputsCleanUp();

    const response = await listService.createList(
      id,
      title,
      category,
      description,
      token
    );

    if (!response) {
      logout();
    }
  };

  const handleCancelNewList = () => setIsModalOpen(false);

  return (
    <div className="list-container">
      <Button label="New List" onClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <Modal
          modalTitle="New List"
          fields={modalProps}
          onClose={handleCancelNewList}
          onSave={handleSaveEvent}
        />
      )}

      <List lists={lists} />
    </div>
  );
}
