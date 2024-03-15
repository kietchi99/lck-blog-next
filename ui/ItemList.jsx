// Comonents
import Item from "./Item";

function ItemList({ articles }) {
  return articles?.map((article) => (
    <Item key={article._id} article={article} />
  ));
}

export default ItemList;
