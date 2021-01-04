import { Application } from 'express';

import RestaurantRoute from './restaurant.route';

/**
 * Init All routes here
 */
export default (app: Application) => {
  // Provider Routes
  app.use('/restaurant', RestaurantRoute);
};
