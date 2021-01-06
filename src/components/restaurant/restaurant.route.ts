import { Request, Response, Router } from 'express';
import RestaurantValidations from './restaurant.validation';
import RestaurantController from './restaurant.controller';
import restaurantMiddleware from './restaurant.middleware';

const router = Router();

// Add Restaurant
router.post('/', RestaurantValidations.addRestaurant, (req: Request, res: Response) => {
  RestaurantController.addRestaurant(req, res);
});

// Update Restaurant
router.put(
  '/:restaurant_id',
  RestaurantValidations.validateRestaurantId,
  RestaurantValidations.addRestaurant,
  RestaurantValidations.updateRestaurant,
  restaurantMiddleware.authorizedRestaurant,
  (req: Request, res: Response) => {
    RestaurantController.updateRestaurant(req, res);
  }
);

export default router;
