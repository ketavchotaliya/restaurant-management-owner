import { NextFunction } from 'express';
import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse } from '../../environment';
import { createResponse } from '../../utils/helper';
import { logger } from '../../utils/logger';
import { RestaurantModel } from '../restaurant/models';
import { TablesModel } from './models';

class TablesMiddleware {
  async authorizedTable(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
      // get Table details
      const tableDetails = await TablesModel.getSingle({
        table_id: req.params.table_id,
      });

      if (!tableDetails) {
        createResponse(res, STATUS_CODES.NOT_FOUND, 'Table not found');
        return;
      }

      // find restautant detaiils
      const restaurantDetails = await RestaurantModel.getSingle({
        restaurant_id: tableDetails.restaurant_id,
      });

      if (!restaurantDetails) {
        createResponse(res, STATUS_CODES.NOT_FOUND, 'Restaurant not found');
        return;
      }

      // authorized restaurant access
      if (restaurantDetails.user_id != req.headers.logged_in_user_id) {
        createResponse(res, STATUS_CODES.FORBIDDEN, 'Access Forbiddin for this Table');
        return;
      }

      next();
    } catch (e) {
      logger.error(__filename, 'TablesMiddleware', '', 'Error in tables middleware', e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  async checkTableNumber_Available(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
      const tableId = req.params.table_id;

      // get Table details
      const tableDetails = await TablesModel.getSingle({
        restaurant_id: req.body.restaurant_id,
        table_no: req.body.table_no,
      });

      if (!tableId && tableDetails) {
        createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Table number already exists');
        return;
      } else if (tableId && tableDetails) {
        if (Number(tableId) === tableDetails.table_id) {
          next();
        } else {
          createResponse(res, STATUS_CODES.UNPROCESSABLE_ENTITY, 'Table number already exists');
          return;
        }
      } else {
        next();
      }
    } catch (e) {
      logger.error(__filename, 'TablesMiddleware', '', 'Error in tables middleware', e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }
}

export default new TablesMiddleware();
