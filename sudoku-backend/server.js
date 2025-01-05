const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');  // Import the CORS package

const app = express();
const port = 3000;

// MongoDB connection details
const uri = 'mongodb://localhost:27017'; // MongoDB URI
const dbName = 'local'; // Your database name
const collectionName = 'Sudoku'; // Your collection name

// Enable CORS for all origins
app.use(cors());

// Endpoint to fetch Sudoku by "id"
app.get('/sudoku-data/:id', async (req, res) => {
  const client = new MongoClient(uri);
  const sudokuId = parseInt(req.params.id, 10); // Convert "id" to an integer

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const sudoku = await collection.findOne({ id: sudokuId });

    if (!sudoku) {
      return res.status(404).send('Sudoku not found');
    }

    res.json({ Sudoku: sudoku });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  } finally {
    await client.close();
  }
});

// Make sure the server is listening for incoming requests
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
