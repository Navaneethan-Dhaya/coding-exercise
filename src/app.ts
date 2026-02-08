import express from 'express';
import bodyParser from 'body-parser';
import itemsRouter from './api/items';
import loginRouter from './api/login';
import { uaLogger, requireAuth, sessionMiddleware, staticMiddleware } from './middleware/appMiddleware';
import { getItemsFromDatabase } from './services/service';
import { CONFIG } from './configs/config';
import { Item } from './models/items';
import { getSortedItemsNames } from './utils/sortUtil';

export const app = express();

// Middleware
app.use(sessionMiddleware);
app.use(uaLogger);
app.use(requireAuth);
app.use(staticMiddleware);
app.use(bodyParser.json());

// Redirect root to login
app.get('/', (req, res) => res.redirect('/login.html'));

// Routes
app.use('/api/items', itemsRouter);
app.use('/api/login', loginRouter);

// Optional: sorting example
async function main(): Promise<void> {
  const items: Item[] = await getItemsFromDatabase(CONFIG.dbPassword);
  const sortedNames: string[] = getSortedItemsNames(items.map(i => i.name));
  console.log('Sorted item names:', sortedNames);
}

main().catch(err => console.error('🔥 Unexpected error', err));