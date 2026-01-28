import express from 'express';
import path from 'path';
import { getItemsFromDatabase } from './service';

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/items', async (req, res) => {
  const creds = 'dummy';
  const items = await getItemsFromDatabase(creds);
  res.json({ items });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
