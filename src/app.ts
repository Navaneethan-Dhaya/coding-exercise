import path from 'path';
import { getItemsFromDatabase } from './service';
import { CONFIG } from './config';
import bodyParser from 'body-parser';
import session from 'express-session';
import express from 'express';
import itemsRouter from './api/items';
import loginRouter from './api/login';



import { uaLogger, requireAuth } from './middleware/appMiddleware';
import { Item } from './items';
import {  getSortedItemsNames } from './sortUtil';

export const app = express();

// Session setup
app.use(session({
  secret: 'Qv9!rX2z@B8wLp4#kF1sG7uH6dJ3mC0tN%yR$e',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 24*60*60*1000 } // 1 day
}));

// Middleware
app.use(uaLogger);
app.use(requireAuth);

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

// Redirect root to login
app.get('/', (req, res) => res.redirect('/login.html'));

app.use('/api/items', itemsRouter);
app.use('/api/login', loginRouter);

// Optional: sorting example
async function main(): Promise<void> {
  const items: Item[] = await getItemsFromDatabase(CONFIG.dbPassword);
  const sortedNames: string[] = getSortedItemsNames(items.map(i => i.name));
  console.log('Sorted item names:', sortedNames);
}

main().catch(err => console.error('🔥 Unexpected error', err));
