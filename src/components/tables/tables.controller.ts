import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse } from '../../environment';
import { createResponse } from '../../utils/helper';
import { logger } from '../../utils/logger';
import { TablesModel } from './models';

class TablesController {
  async addTable(req: CustomRequest, res: CustomResponse) {
    try {
      const { restaurant_id, table_no, table_size } = req.body;

      // add table in restaurant
      await TablesModel.addOne({
        restaurant_id,
        table_no,
        table_size,
        is_active: 1,
      });

      createResponse(res, STATUS_CODES.OK, 'Tables added successfully');
    } catch (e) {
      logger.error(__filename, '', 'addTable', 'Internal server Error', e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
  }

  async updateTable(req: CustomRequest, res: CustomResponse) {
    try {
      const { table_no, table_size, is_active } = req.body;

      const { table_id } = req.params;

      await TablesModel.updateOne(
        {
          table_id,
        },
        {
          table_no,
          table_size,
          is_active,
        }
      );

      createResponse(res, STATUS_CODES.OK, 'Table updated successfully');
    } catch (e) {
      logger.error(__filename, '', 'updateTable', 'Internal server Error', e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
  }

  async deleteTable(req: CustomRequest, res: CustomResponse) {
    try {
      const { table_id } = req.params;

      await TablesModel.delete({
        table_id,
      });

      createResponse(res, STATUS_CODES.OK, 'Table deleted successfully');
    } catch (e) {
      logger.error(__filename, '', 'deleteTable', 'Internal server Error', e);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal Server Error');
    }
  }
}

export default new TablesController();
