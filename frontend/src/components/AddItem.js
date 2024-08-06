import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'E0pNpgkcEH5KVzhKAdHQdJf7KXCypkw3W-LvqyY8nyk';

function AddItem({ addItem }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (name) {
      fetchImage(name);
    }
  }, [name]);

  const fetchImage = async (query) => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query, per_page: 1 },
        headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
      });
      const imageUrl = response.data.results[0]?.urls?.small;
      setImageURL(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && quantity && imageURL) {
      addItem({ id: Date.now(), name, quantity, expirationDate, imageURL });
      setName('');
      setQuantity('');
      setExpirationDate('');
      setImageURL('');
    }
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <input
        className="add-item-input"
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="add-item-input"
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        className="add-item-input"
        type="date"
        placeholder="Expiration Date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      {imageURL && <img src={imageURL} alt="Item Preview" className="item-preview" />}
      <button className="add-item-button" type="submit">Add Item</button>
    </form>
  );
}

export default AddItem;
