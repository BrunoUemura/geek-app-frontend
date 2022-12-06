import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { ListHeader } from "../../../components/List/components/ListHeader";
import { Button } from "../../../components/UI/Button";
import { Modal } from "../../../components/UI/Modal";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../constants/routes";
import { listItemService } from "../../../services/http/list";
import { ILists } from "../../../@types/ILists";
import { RenderItems } from "../../../components/Items/components/RenderItems";
import Navbar from "../../../components/Navbar";

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
  const [status, setStatus] = useState<string>("");
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
      label: "Status",
      inputType: "text",
      inputValue: status,
      setState: setStatus,
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
      <div className="w-screen h-screen bg-neutral-800 flex flex-col justify-center items-center">
        <span className="text-white">No List found for id {id}</span>
        <Link href={ROUTES.ROOT}>
          <button className="bg-neutral-700 text-white p-2">Go back</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-w-screen min-h-screen p-10 bg-neutral-800">
      <Navbar />

      <ListHeader list={list} />

      <div className="mt-8 mb-4 flex flex-col justify-between sm:flex-row">
        <ShowNewItemButton
          isAuthenticated={isAuthenticated}
          setIsModalOpen={setIsModalOpen}
        />

        <div className="flex mt-2 sm:mt-0">
          <input
            className="p-2 bg-neutral-600 text-white w-2/3 focus:outline-none"
            type="text"
            placeholder="Search an item..."
          />
          <button className="px-3 bg-black text-white w-1/3">Search</button>
        </div>
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
  if (!isAuthenticated) return null;

  return <Button label="Add Item" onClick={() => setIsModalOpen(true)} />;
};
