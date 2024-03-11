import { Request, Response, NextFunction } from 'express';

interface AuthMiddlewareInterface {
    authenticate: (req: Request, res: Response, next: NextFunction) => void;
    authenticationCheck: (req: Request, res: Response, next: NextFunction) => void;

}

export { AuthMiddlewareInterface }