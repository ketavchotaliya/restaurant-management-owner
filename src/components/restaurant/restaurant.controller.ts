import STATUS_CODES, { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { CustomRequest, CustomResponse, Pager } from '../../environment';
import { createResponse } from '../../utils/helper';
import { logger } from '../../utils/logger';
import { RestaurantModel } from './models';

class RestaurantController {
  async addRestaurant(req: CustomRequest, res: CustomResponse) {
    try {
      const {
        restaurant_name,
        address,
        phone_number,
        open_time_1,
        open_time_2,
        close_time_1,
        close_time_2,
        min_reservation_period,
      } = req.body;

      await RestaurantModel.addOne({
        restaurant_name,
        user_id: Number(req.headers.logged_in_user_id),
        address,
        phone_number,
        open_time_1,
        close_time_1,
        open_time_2,
        close_time_2,
        is_restaurant_open: 1,
        min_reservation_period,
        is_active: 1,
        created_at: new Date(),
      });

      createResponse(res, STATUS_CODES.OK, 'Restaurant added successfully');
    } catch (e) {
      logger.error(__filename, '', 'addRestaurant', 'Internal server Error', e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
  }
}

export default new RestaurantController();
