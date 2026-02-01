import { Request, Response, NextFunction } from 'express';
import * as UAParserModule from 'ua-parser-js';
import is from 'is';


// Middleware to log User-Agent info
export function uaLogger(req: Request, res: Response, next: NextFunction) {
    const parser = new UAParserModule.UAParser();
    const uaResult = parser.setUA(req.headers['user-agent'] || '').getResult();
    console.log('User-Agent Info:', uaResult);
    next();
}

// Middleware to protect pages and APIs
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    // Allow login page & login API
    if (
        req.path === '/login.html' ||
        req.path === '/' ||
        req.path === '/api/login' ||
        req.path === '/api/items'
    ) {
        return next();
    }

    // Validate session object using `is`
    if (!is.object(req.session) || !is.boolean((req.session as any)?.isAuthenticated)) {
        return res.redirect('/login.html');
    }

    next();
}


