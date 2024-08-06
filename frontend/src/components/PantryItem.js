import React, { useState } from 'react';
import EditItem from './EditItem';

function PantryItem({ item, deleteItem, updateItem }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleSave = (updatedItem) => {
    updateItem(updatedItem);
    setIsEditing(false);
  };

  return (
    <div className="pantry-item">
      {isEditing ? (
        <EditItem item={item} saveItem={handleSave} />
      ) : (
        <>
          <span>{item.name}</span> - <span>{item.quantity}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default PantryItem;
