import { Application } from 'express';

import RestaurantRoute from './restaurant.route';
import TablesRoute from './tables.route';

/**
 * Init All routes here
 */
export default (app: Application) => {
  // Provider Routes
  app.use('/restaurant', RestaurantRoute);
  app.use('/private', RestaurantRoute);
  app.use('/restaurant', TablesRoute);
};
