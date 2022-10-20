import { api } from "./api";
import { ILists } from "../types/ILists";

interface IResponseSingle {
  status: string;
  data: ILists | null;
}

interface IResponseArray {
  status: string;
  data: ILists[] | null;
}

async function fetchListByListId(
  listId: string,
  token: string
): Promise<ILists | null> {
  try {
    const { data } = await api.get(`/list/${listId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data?.data;
  } catch (error) {
    return null;
  }
}

async function fetchListByUserId(
  userId: string = "",
  token: string = ""
): Promise<ILists[] | null> {
  try {
    const { data } = await api.get(`/list?user_id=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data?.data;
  } catch (error) {
    return null;
  }
}

async function createList(
  userId: string,
  title: string,
  category: string,
  description: string,
  token: string
) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      userId,
      title,
      category,
      description,
    }),
  };

  const result = await fetch(`${BACKEND_URL}/v1/list/`, requestOptions);
  return await result.json();
}

async function updateList(
  listId: string,
  title: string,
  category: string,
  description: string,
  token: string
) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      title,
      category,
      description,
    }),
  };

  const result = await fetch(
    `${BACKEND_URL}/v1/list/${listId}`,
    requestOptions
  );
  return await result.json();
}

export const listService = {
  fetchListByListId,
  fetchListByUserId,
  createList,
  updateList,
};
