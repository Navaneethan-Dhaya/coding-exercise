import { Router } from 'express';
import is from 'is';

const router = Router();

router.post('/', (req, res) => {
    const { username, password } = req.body;

    if (!is.string(username) || !is.string(password)) {
        return res.status(400).send('Invalid input');
    }

    if (username === 'admin' && password === 'admin') {
        (req.session as any).isAuthenticated = true;
        return res.sendStatus(200);
    }

    res.sendStatus(401);
});

export default router;
