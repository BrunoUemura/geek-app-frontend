import { useEffect, useState } from "react";

import { ILists } from "../../@types/ILists";
import { listService } from "../../services/http/list";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/UI/Button";
import { Modal } from "../../components/UI/Modal";
import { RenderList } from "../../components/List/components/RenderList";
import Router from "next/router";
import { ROUTES } from "../../constants/routes";

export default function Lists() {
  const { id, token, logout, isAuthenticated } = useAuth();

  const [lists, setLists] = useState<ILists[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAwaitingSave, setIsAwaitingSave] = useState<boolean>(false);

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
    if (!isAuthenticated) {
      Router.push(ROUTES.LOGIN);
    }

    (async () => {
      const response = await listService.fetchListByUserId(String(id));

      if (!response) {
        logout();
        return;
      }

      setLists(response);
      setIsLoading(!isLoading);
    })();
  }, []);

  const inputsCleanUp = () => {
    setTitle("");
    setCategory("");
    setDescription("");
  };

  const handleSaveEvent = async () => {
    setIsAwaitingSave(true);
    const response = await listService.createList(
      id,
      title,
      category,
      description,
      token
    );

    setIsAwaitingSave(false);
    inputsCleanUp();

    if (!response) {
      logout();
    }

    location.reload();
  };

  const handleCancelNewList = () => setIsModalOpen(false);

  return (
    <div className="w-screen h-screen p-10">
      <div className="mb-8">
        <Button label="New List" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && (
        <Modal
          modalTitle="New List"
          fields={modalProps}
          cancelLabel="Cancel"
          confirmLabel="Save"
          isAwaitingSave={isAwaitingSave}
          onClose={handleCancelNewList}
          onSave={handleSaveEvent}
        />
      )}

      <RenderList isLoading={isLoading} lists={lists} />
    </div>
  );
}
