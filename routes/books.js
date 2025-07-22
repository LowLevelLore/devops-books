const express = require('express');
const router = express.Router();

let current_id = 3;

let books_storage = [
  { id: 1, title: 'Twisted Love', author: 'Ana Huang' },
  { id: 2, title: 'Half Girlfriend', author: 'Chetan Bhagat' }
];

router.get('/', function (req, res) {
  console.log("Here");
  res.json({ books: books_storage });
});

router.post('/', function(req, res) {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  books_storage.push({ id: current_id, title, author });
  current_id += 1;
  res.status(201).json({ message: 'Book added successfully.' });
});

router.get('/:id', function(req, res) {
  const book = books_storage.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found.' });
  res.json(book);
});

router.put('/:id', function(req, res) {
  const index = books_storage.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found.' });

  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Missing title or author.' });
  }

  books_storage[index] = { id: parseInt(req.params.id), title, author };
  res.json({ message: 'Book replaced successfully.' });
});

router.patch('/:id', function (req, res) {
  const index = books_storage.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found.' });
    
  const { title, author } = req.body;

  if (title) books_storage[index].title = title;
  if (author) books_storage[index].author = author;
  
  res.json({ message: 'Book updated successfully.', book: books_storage[index]});
});

router.delete('/:id', function(req, res) {
  const index = books_storage.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found.' });

  books_storage.splice(index, 1);
  res.json({ message: 'Book deleted successfully.' });
});

module.exports = router;
