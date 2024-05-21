import { body, param, validationResult, ValidationError } from 'express-validator';
import statusCode from '../common/constant/status.code';
import { ErrorRequestHandler,NextFunction, Request, Response } from 'express';

/**
 * Reserve Validator
*/
const reserveValidator = [
  body('reserveTime')
  .notEmpty().withMessage('reserveTime field is required. Please provide a value.')
  .isString().withMessage('reserveTime must be String')
  .bail(),

  body('affiliation')
  .notEmpty().withMessage('affiliation field is required. Please provide a value.')
  .isString().withMessage('affiliation must be String')
  .bail(),

  body('option')
  .notEmpty().withMessage('option field is required. Please provide a value.')
  .isString().withMessage('option must be String')
  .bail(),

  body('type')
  .notEmpty().withMessage('type field is required. Please provide a value.')
  .isString().withMessage('type must be String')
  .bail(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(statusCode.BAD_REQUEST).json({ errors: errors.array()});
    }
    next();
  }
];

export default {
  reserveValidator
}

