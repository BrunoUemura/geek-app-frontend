import { api } from "../../api";
import { ILists } from "../../../@types/ILists";

async function fetchListByListId(listId: string): Promise<ILists | null> {
  try {
    const url = `/list/${listId}`;

    const { data: response } = await api.get(url);

    return response?.data;
  } catch (error) {
    return null;
  }
}

async function fetchListByUserId(userId: string): Promise<ILists[] | null> {
  try {
    const url = `/list?userId=${userId}`;

    const { data: response } = await api.get(url);

    return response?.data;
  } catch (error) {
    return null;
  }
}

async function createList(
  userId: string = "",
  title: string,
  category: string,
  description: string,
  token: string = ""
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

    const { data } = await api.post(url, body, config);

    return data;
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

async function deleteList(
  listId: string = "",
  token: string = ""
): Promise<ILists | null> {
  try {
    const url = `/list/${listId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.delete(url, config);

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
  deleteList,
};

async function createListItem(
  listId: string = "",
  title: string,
  season: number,
  episode: number,
  chapter: number,
  link: string,
  image: string,
  token: string = ""
) {
  try {
    const url = `/list/${listId}/item`;
    const body = {
      title,
      season,
      episode,
      chapter,
      link,
      image,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.post(url, body, config);

    return data;
  } catch (error) {
    return null;
  }
}

async function updateListItem(
  itemId: string,
  listId: string,
  title: string,
  season: number,
  episode: number,
  chapter: number,
  link: string,
  image: string,
  token: string
) {
  try {
    const url = `/list/${listId}/item/${itemId}`;
    const body = {
      title,
      season,
      episode,
      chapter,
      link,
      image,
    };
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

async function deleteListItemById(
  listId: string = "",
  itemId: string = "",
  token: string = ""
): Promise<ILists[] | null> {
  try {
    const url = `/list/${listId}/item/${itemId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.delete(url, config);

    return data;
  } catch (error) {
    return null;
  }
}

export const listItemService = {
  createListItem,
  updateListItem,
  deleteListItemById,
};
