const express = require('express');
const pool = require('./db'); // Import the database connection
const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    const currentTime = result.rows[0].current_time;
    res.send(`Current time in the database: ${currentTime}`);
    client.release();
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error');
  }
});

app.listen(PORT, async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    const currentTime = result.rows[0].current_time;
    console.log(`Connected to database. Current time: ${currentTime}`);
    client.release();
  } catch (error) {
    console.error('Error connecting to database', error);
  }
  console.log(`Server running on port ${PORT}`);
});
