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
          {item.imageURL && <img src={item.imageURL} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }} />}
          <span>{item.name}</span> - <span>{item.quantity}</span> - <span>{item.expirationDate}</span>
          <div>
            <button className="edit-button" onClick={handleEdit}>Edit</button>
            <button className="delete-button" onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default PantryItem;
