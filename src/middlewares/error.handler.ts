import {Request, Response, NextFunction} from 'express';

/**
 * Error Handler Middleware 
*/
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    return res.status(500).json(error.message);
  }
}

export { errorHandler };