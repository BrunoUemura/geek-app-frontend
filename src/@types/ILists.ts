export interface ILists {
  id: string;
  userId: string;
  title: string;
  category: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  listItem: IListItem[];
}

export interface IListItem {
  id: string;
  listId: string;
  title: string;
  season: number;
  episode: number;
  chapter: null;
  status: string;
  link: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
