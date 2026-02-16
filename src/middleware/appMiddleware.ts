import { Request, Response, NextFunction } from 'express';
import * as UAParserModule from 'ua-parser-js';
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

// Middleware to protect pages and APIs using userId in session
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (
        req.path === '/login.html' ||
        req.path === '/' ||
        req.path === '/api/login' ||
        req.path === '/api/items'
    ) {
        return next();
    }

    if (!req.session || typeof (req.session as any).userId !== 'string') {
        return res.redirect('/login.html');
    }

    next();
}

// Helper to set user session after successful login
export function setUserSession(req: Request, userId: string) {
    (req.session as any).userId = userId;
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