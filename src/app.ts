import express from 'express';
import path from 'path';
import { getItemsFromDatabase } from './service';
import { CONFIG } from './config';

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/items', async (req, res) => {
  const creds = CONFIG.dbPassword;
  const items = await getItemsFromDatabase(creds);
  res.json({ items });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import { getSortedItems } from './sortUtil';
import { Item } from './items';

async function main(): Promise<void> {
  const items: Item[] = await getItemsFromDatabase(CONFIG.dbPassword);
  const sorted: string[] = await getSortedItems(items.map(i => i.name));
  console.log('Sorted item names:', sorted);
}

main().catch(err => {
  console.error('🔥 Unexpected error', err);
});
