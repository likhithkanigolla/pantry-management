import React, { useState } from 'react';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (updatedItem) => {
    setItems(
      items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  return (
    <div className="App">
      <h1>Pantry Management System</h1>
      <AddItem addItem={addItem} />
      <ItemList items={items} deleteItem={deleteItem} updateItem={updateItem} />
    </div>
  );
}

export default App;
