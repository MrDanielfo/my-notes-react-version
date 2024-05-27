import { useState, Dispatch, SetStateAction, FC } from 'react';
import './styles.css';
interface ItemProps {
  itemData: {id: number, title: string};
  setItemsToSelect: Dispatch<SetStateAction<{ id: number, title: string }[]>>
}
const Item: FC<ItemProps> = ({ itemData, setItemsToSelect }) => {
  const [isClicked, setIsClicked] = useState(false)
  function handleSelect(event) {
    event.preventDefault();
    setIsClicked((prevValue) => !prevValue)
    if (!isClicked) {
      setItemsToSelect((prevValue) => [...prevValue, itemData])
    } else {
      setItemsToSelect((prevValue) => {
        return prevValue.filter((element) => element.id !== itemData.id)
      })
    }
  }

  return (
    <li onClick={(e) => handleSelect(e)} id={itemData.id} className={`singleItem ${isClicked ? 'selected': ''}`}>
      {itemData.title}
    </li>
  )
}

export default Item;
