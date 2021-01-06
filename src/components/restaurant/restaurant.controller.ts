import STATUS_CODES from 'http-status-codes';
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

  async updateRestaurant(req: CustomRequest, res: CustomResponse) {
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
        is_restaurant_open,
        is_active,
      } = req.body;

      const { restaurant_id } = req.params;

      await RestaurantModel.updateOne(
        {
          restaurant_id,
        },
        {
          restaurant_name,
          address,
          phone_number,
          open_time_1,
          close_time_1,
          open_time_2,
          close_time_2,
          is_restaurant_open,
          min_reservation_period,
          is_active,
          updated_at: new Date(),
          updated_by: Number(req.headers.logged_in_user_id),
        }
      );

      createResponse(res, STATUS_CODES.OK, 'Restaurant updated successfully');
    } catch (e) {
      logger.error(__filename, '', 'updateRestaurant', 'Internal server Error', e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
  }

  async getRestaurant(req: CustomRequest, res: CustomResponse) {
    try {
      const { restaurant_id } = req.params;

      const restaurantDetails = await RestaurantModel.getDetails({
        restaurant_id,
      });

      if (!restaurantDetails) {
        createResponse(res, STATUS_CODES.NOT_FOUND, 'Restaurant not found');
        return;
      }

      createResponse(res, STATUS_CODES.OK, 'Restaurant found', restaurantDetails);
    } catch (e) {
      logger.error(__filename, '', 'updateRestaurant', 'Internal server Error', e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
  }
}

export default new RestaurantController();
