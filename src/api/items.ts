import { Router } from 'express';
import { getItemsFromDatabase } from '../services/service';
import {requireAuth} from "../middleware/appMiddleware";
import {CONFIG} from "../configs/config";
import {Item} from "../models/items";
import is from 'is';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
    const creds = CONFIG.dbPassword;
    const items: Item[] = await getItemsFromDatabase(creds);

    if (!is.array(items) || !items.every(item => is.object(item))) {
        return res.status(500).send('Invalid items data');
    }

    res.json({ items });
});

export default router;