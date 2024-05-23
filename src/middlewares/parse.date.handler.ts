import { Request, Response, NextFunction } from 'express';

/**
 * parsing String to Date Middleware
*/
const parseDateTimeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { reserveTime } = req.body;
  console.log('reserveTime ->', reserveTime);
  if (reserveTime) {
      // ISO 8601 형식의 문자열을 Date 객체로 변환
      req.body.reserveTime = new Date(reserveTime);
      
  }
  next();
};

export {parseDateTimeMiddleware}