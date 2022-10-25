import { api } from "./api";
import { ILists } from "../types/ILists";
import { AxiosError } from "axios";

async function fetchListByListId(
  listId: string,
  token: string
): Promise<ILists | null> {
  try {
    const url = `/list/${listId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data: response } = await api.get(url, config);

    return response?.data;
  } catch (error) {
    return null;
  }
}

async function fetchListByUserId(
  userId: string = "",
  token: string = ""
): Promise<ILists[] | null> {
  try {
    const url = `/list?user_id=${userId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data: response } = await api.get(url, config);

    return response?.data;
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
  try {
    const url = "/list";
    const body = {
      userId,
      title,
      category,
      description,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data: response } = await api.post(url, body, config);

    return response?.data;
  } catch (error) {
    return null;
  }
}

async function updateList(
  listId: string,
  title: string,
  category: string,
  description: string,
  token: string | undefined
) {
  try {
    const url = `/list/${listId}`;
    const body = { title, category, description };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.put(url, body, config);

    return data;
  } catch (error) {
    return null;
  }
}

export const listService = {
  fetchListByListId,
  fetchListByUserId,
  createList,
  updateList,
};
