const BACKEND_URL = "https://geek-app-backend-production.up.railway.app/api";

interface IResponseSingle {
  status: string;
  isError: boolean;
  data: any;
}

interface IResponseArray {
  status: string;
  isError: boolean;
  data: any[];
}

async function fetchListByListId(
  listId: string,
  token: string
): Promise<IResponseSingle> {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const result = await fetch(
    `${BACKEND_URL}/v1/list?id=${listId}`,
    requestOptions
  );

  return await result.json();
}

async function fetchListByUserId(
  userId: string,
  token: string
): Promise<IResponseArray> {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const result = await fetch(
    `${BACKEND_URL}/v1/list?user_id=${userId}`,
    requestOptions
  );

  return await result.json();
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

export const list = {
  fetchListByListId,
  fetchListByUserId,
  createList,
  updateList,
};
