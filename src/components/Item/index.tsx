import { IListItem } from "../../interfaces/ILists";

export default function ListItem(item: IListItem) {
  return (
    <div>
      <img src={item.image} alt={item.title} />
      <span>{item.title}</span>
      <span>{item.season}</span>
      <span>{item.episode}</span>
      <span>{item.link}</span>
      <a href={item.link}>Direct Link</a>
    </div>
  );
}
