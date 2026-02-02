import { Request, Response, NextFunction } from 'express';
import * as UAParserModule from 'ua-parser-js';
import is from 'is';
import session from 'express-session';
import express from 'express';
import path from 'path';

// Middleware to log User-Agent info
export function uaLogger(req: Request, res: Response, next: NextFunction) {
    const parser = new UAParserModule.UAParser();
    const uaResult = parser.setUA(req.headers['user-agent'] || '').getResult();
    console.log('User-Agent Info:', uaResult);
    next();
}

// Middleware to protect pages and APIs
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (
        req.path === '/login.html' ||
        req.path === '/' ||
        req.path === '/api/login' ||
        req.path === '/api/items'
    ) {
        return next();
    }

    if (!is.object(req.session) || !is.boolean((req.session as any)?.isAuthenticated)) {
        return res.redirect('/login.html');
    }

    next();
}

// Middleware for session setup
export const sessionMiddleware = session({
    secret: 'Qv9!rX2z@B8wLp4#kF1sG7uH6dJ3mC0tN%yR$e',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } // 1 day
});

// Middleware for serving static files
export const staticMiddleware = express.static(path.join(__dirname, '../../public'));