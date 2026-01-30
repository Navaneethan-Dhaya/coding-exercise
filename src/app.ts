import express from 'express';
import path from 'path';
import { getItemsFromDatabase } from './service';
import { CONFIG } from './config';
import * as UAParserModule from "ua-parser-js";

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));

// Middleware to log user-agent information
app.use((req, res, next) => {
  const parser = new UAParserModule.UAParser();
  const uaResult = parser.setUA(req.headers['user-agent'] || '').getResult();
  console.log('User-Agent Info:', uaResult);
  next();
});

app.get('/api/items', async (req, res) => {
  const creds = CONFIG.dbPassword;
  const nonSortedItems = await getItemsFromDatabase(creds);
  const items: Item[] = await getSortedItems(nonSortedItems);
  console.log("Sorted items :", items);
  res.json({ items });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import {getSortedItems, getSortedItemsNames} from './sortUtil';
import { Item } from './items';

async function main(): Promise<void> {
  const items: Item[] = await getItemsFromDatabase(CONFIG.dbPassword);
  const sortedNames: string[] = await getSortedItemsNames(items.map(i => i.name));
  console.log('Sorted item names:', sortedNames);
}

main().catch(err => {
  console.error('🔥 Unexpected error', err);
});
