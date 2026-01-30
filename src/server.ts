import express from 'express';
import path from 'path';
import { getItemsFromDatabase } from './service';
import {Item} from "./items";
import {getSortedItems} from "./sortUtil";

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/items', async (req, res) => {
  const creds = 'dummy';
  const nonSortedItems = await getItemsFromDatabase(creds);
  const items: Item[] = await getSortedItems(nonSortedItems);
  res.json({ items });
});

app.listen(PORT, () => {
  console.log(`Server running from server.ts at http://localhost:${PORT}`);
});
