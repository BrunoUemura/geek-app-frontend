import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { ListHeader } from "../../../components/Feature/ListHeader";
import { Button } from "../../../components/UI/Button";
import { Modal } from "../../../components/UI/Modal";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../routes";
import { listItemService } from "../../../services/listService";
import { ILists } from "../../../types/ILists";
import { RenderItems } from "../../../components/Feature/Items/RenderItems";

export const getServerSideProps: GetServerSideProps<{ list: ILists }> = async (
  context
) => {
  const { id } = context.query;
  const url = `${process.env.BACKEND_API}/list/${id}`;

  const res = await fetch(url);
  const { data } = await res.json();

  if (data === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { list: data },
  };
};

export default function ListsDetails({
  list,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { id } = router.query;

  const { isAuthenticated, logout, token } = useAuth();

  const [isAwaitingSave, setIsAwaitingSave] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

    location.reload();
  };

  const handleCancelNewList = () => setIsModalOpen(false);

  if (!list) {
    return (
      <div>
        <span>No List found for id {id}</span>
        <Link href={ROUTES.LIST}>
          <button>Go back</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen p-10">
      <ListHeader list={list} />

      <ShowNewItemButton
        isAuthenticated={isAuthenticated}
        setIsModalOpen={setIsModalOpen}
      />

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

      <RenderItems isLoading={false} items={list.listItem} />
    </div>
  );
}

interface ShowNewItemButtonProps {
  isAuthenticated: boolean | undefined;
  setIsModalOpen: (value: any) => void;
}

const ShowNewItemButton = ({
  isAuthenticated,
  setIsModalOpen,
}: ShowNewItemButtonProps) => {
  if (!isAuthenticated) return <div className="mt-8 mb-4"></div>;

  return (
    <div className="mt-8 mb-4">
      <Button label="Add Item" onClick={() => setIsModalOpen(true)} />
    </div>
  );
};
