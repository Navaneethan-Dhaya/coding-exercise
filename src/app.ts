import path from 'path';
import { getItemsFromDatabase } from './service';
import { CONFIG } from './config';
import bodyParser from 'body-parser';
import session from 'express-session';
import express from 'express';

import { uaLogger, requireAuth } from './middleware/appMiddleware';
import { Item } from './items';
import { getSortedItems, getSortedItemsNames } from './sortUtil';

const app = express();
const PORT = 3000;

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

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === CONFIG.userName && password === CONFIG.userPassword) {
    (req.session as any).isAuthenticated = true;
    return res.sendStatus(200);
  }

  res.sendStatus(401);
});

// Inventory items API
app.get('/api/items', requireAuth, async (req, res) => {
  const creds = CONFIG.dbPassword;
  const items: Item[] = await getItemsFromDatabase(creds);
  res.json({ items });
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// Optional: sorting example
async function main(): Promise<void> {
  const items: Item[] = await getItemsFromDatabase(CONFIG.dbPassword);
  const sortedNames: string[] = await getSortedItemsNames(items.map(i => i.name));
  console.log('Sorted item names:', sortedNames);
}

main().catch(err => console.error('🔥 Unexpected error', err));
