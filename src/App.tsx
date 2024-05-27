import { useState, useEffect } from 'react'
import Form from './components/Form/index';

import './App.css'
import Item from './components/Item/index';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsToRedo, setItemsToRedo] = useState([]);
  const [itemsToSelect, setItemsToSelect] = useState([]);
  const [cancelBtnDisabled, setCancelBtnDisabled] = useState(true)
  const [redoBtnDisabled, setRedoBtnDisabled] = useState(true)

  function handleDeleteItems(event) {
    event.preventDefault();
    // console.log('hola')
    itemsToSelect.forEach((item) => {
      setItems((prevItems) => {
        return prevItems.filter((originalItem) => originalItem.id !== item.id)
      })
    })
    setItemsToSelect([]);
    setItemsToRedo(itemsToSelect);
  }

  function handleRedoItems(event) {
    event.preventDefault();
    itemsToRedo.forEach((item) =>  {
      setItems((prevValue) => [...prevValue, item])
    })
    setItemsToRedo([])
  }

  useEffect(() => {
    // console.log(itemsToSelect)
    if (itemsToSelect.length > 0) {
      setCancelBtnDisabled(false);
    } else {
      setCancelBtnDisabled(true);
    }
  }, [itemsToSelect])

  useEffect(() => {
    if (itemsToRedo.length > 0) {
      setRedoBtnDisabled(false);
    } else {
      setRedoBtnDisabled(true)
    }
  }, [itemsToRedo])

  return (
    <>
      <h1>My Items app</h1>
      {showForm && <Form setItems={setItems} setShowForm={setShowForm} /> }
      <ul className="item-container">
        {items.map((item) => (
          // <li key={index} itemData={data}>{item}</li>
          <Item key={item.id} itemData={item} setItemsToSelect={setItemsToSelect} />
        ))}
      </ul>
      <div className="buttons-container">
        <button className="btn undo-btn" disabled={redoBtnDisabled} onClick={handleRedoItems}>Undo Changes</button>
        <button className="btn delete-btn" disabled={cancelBtnDisabled} onClick={handleDeleteItems}>Delete</button>
        <button className="btn show-form" onClick={() => setShowForm(true)}>Add</button>
      </div>
    </>
  )
}

export default App
