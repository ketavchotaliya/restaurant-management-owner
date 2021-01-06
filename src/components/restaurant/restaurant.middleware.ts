import { NextFunction } from 'express';
import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse } from '../../environment';
import { createResponse } from '../../utils/helper';
import { logger } from '../../utils/logger';
import { RestaurantModel } from './models';

class RestaurantMiddleware {
  async authorizedRestaurant(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
      // get Restaurant details
      const restaurantDetails = await RestaurantModel.getSingle({
        restaurant_id: req.params.restaurantId,
      });

      if (!restaurantDetails) {
        createResponse(res, STATUS_CODES.NOT_FOUND, 'Restaurant not found');
        return;
      }

      // authorized restaurant access
      if (restaurantDetails?.user_id != req.headers.logged_in_user_id) {
        createResponse(res, STATUS_CODES.FORBIDDEN, 'Access Forbiddin for this Restaurant');
        return;
      }

      next();
    } catch (e) {
      logger.error(__filename, 'RestaurantMiddleware', '', 'Error in restaurant middleware', e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }
}

export default new RestaurantMiddleware();
