import { Router } from 'express';
import is from 'is';
import { LoginPayload } from '../models/login';
import { setUserSession } from '../middleware/appMiddleware';
import { users } from '../models/users';
import * as bcrypt from 'bcrypt';

const router = Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body as LoginPayload;

    if (!is.string(username) || !is.string(password)) {
        return res.status(400).send('Invalid input');
    }

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.sendStatus(401);
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (match) {
        setUserSession(req, username); // Store userId in session
        return res.sendStatus(200);
    }

    res.sendStatus(401);
});

router.post('/logout', (req, res) => {
    req.session?.destroy(() => {
        res.sendStatus(200);
    });
});

export default router;
