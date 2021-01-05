import { Request, Response, Router } from 'express';
import RestaurantValidations from './restaurant.validation';
import RestaurantController from './restaurant.controller';
// import Authorization from '../../middleware/authorization';

const router = Router();

// Add Restaurant
router.post('/', RestaurantValidations.addRestaurant, (req: Request, res: Response) => {
  RestaurantController.addRestaurant(req, res);
});

export default router;
