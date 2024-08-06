const express = require('express');
const db = require('../models/item');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get items for authenticated user
router.get('/', authMiddleware, (req, res) => {
  db.all('SELECT * FROM items WHERE userId = ?', [req.userId], (err, rows) => {
    if (err) return res.status(500).send('There was a problem finding the items.');
    res.status(200).send(rows);
  });
});

// Add item for authenticated user
router.post('/', authMiddleware, (req, res) => {
  const { name, quantity } = req.body;
  db.run('INSERT INTO items (name, quantity, userId) VALUES (?, ?, ?)', [name, quantity, req.userId], function (err) {
    if (err) return res.status(500).send('There was a problem adding the item.');
    res.status(200).send({ id: this.lastID });
  });
});

// Update item
router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  db.run('UPDATE items SET name = ?, quantity = ? WHERE id = ? AND userId = ?', [name, quantity, id, req.userId], function (err) {
    if (err) return res.status(500).send('There was a problem updating the item.');
    if (this.changes === 0) return res.status(404).send('No item found.');
    res.status(200).send('Item updated successfully.');
  });
});

// Delete item
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM items WHERE id = ? AND userId = ?', [id, req.userId], function (err) {
    if (err) return res.status(500).send('There was a problem deleting the item.');
    if (this.changes === 0) return res.status(404).send('No item found.');
    res.status(200).send('Item deleted successfully.');
  });
});

module.exports = router;
