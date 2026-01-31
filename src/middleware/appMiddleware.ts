import { Request, Response, NextFunction } from 'express';
import * as UAParserModule from 'ua-parser-js';

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
        req.path === '/api/login'
    ) {
        return next();
    }

    const isAuthenticated = (req.session as any)?.isAuthenticated;

    // Protect API routes - Commented as it will block direct api access
/*    if (req.path.startsWith('/api/') && !isAuthenticated) {
        return res.status(401).json({
            error: 'Unauthorized',
            login: '/login.html'
        });
    }*/

    // Protect HTML pages
    if (req.path.endsWith('.html') && !isAuthenticated) {
        return res.redirect('/login.html');
    }

    next();
}


