import React, { useState } from 'react';

function EditItem({ item, saveItem }) {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [expirationDate, setExpirationDate] = useState(item.expirationDate);

  const handleSave = () => {
    saveItem({ ...item, name, quantity, expirationDate });
  };

  return (
    <div className="edit-item-form">
      <input
        className="edit-item-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="edit-item-input"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        className="edit-item-input"
        type="date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <button className="edit-item-button" onClick={handleSave}>Save</button>
    </div>
  );
}

export default EditItem;
