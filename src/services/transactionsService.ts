import { ITransaction } from "../types/ITransaction";
import { api } from "./api";

export async function fetchTransactions(
  userId: string = "",
  token: string = ""
): Promise<ITransaction[] | null> {
  try {
    const response = await api.get(`/v1/transactions/userid/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
