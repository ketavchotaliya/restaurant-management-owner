import { Request, Response, Router } from 'express';
import RestaurantValidations from './restaurant.validation';
import RestaurantController from './restaurant.controller';
import Authorization from '../../middleware/authorization';

const router = Router();

router.post('/list', [/* Authorization.isAuthorized, */ RestaurantValidations.list], (req: Request, res: Response) => {
  RestaurantController.restaurantList(req, res);
});

export default router;
