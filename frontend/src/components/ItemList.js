import React from 'react';
import PantryItem from './PantryItem';

function ItemList({ items, deleteItem, updateItem }) {
  return (
    <div>
      {items.map((item) => (
        <PantryItem
          key={item.id}
          item={item}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
      ))}
    </div>
  );
}

export default ItemList;
