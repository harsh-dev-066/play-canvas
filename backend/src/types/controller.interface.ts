import { Request, Response } from 'express';

interface controller_interface {
    basicController: (req: Request, res: Response) => void;
}

export { controller_interface }