import createConnectionRDB  from './db/rdb.conn';

import express, { Express } from 'express';

import dotenv from 'dotenv';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import { errorHandler } from './middlewares/error.handler';
import { reserveRouter } from './routes/index.route';

dotenv.config();

const app: Express = express();

/**
 * common middleware
*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));

if(process.env.NODE_ENV === 'production') {
  // helmet
  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter()); 
  app.use(helmet.frameguard())

  // hpp
  app.use(hpp()); 

  // morgan 
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// try {
//   createConnectionRDB();
//   console.log('SUCCESS DB CONNECTION POOL');
// } catch (e) {
//   throw e;
// }


// router
app.use('/api/v1/reservation', reserveRouter);

// Error Handler Middleware
app.use(errorHandler);

export default app;

