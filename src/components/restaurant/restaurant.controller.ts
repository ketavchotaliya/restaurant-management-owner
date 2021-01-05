import STATUS_CODES from 'http-status-codes';
import { CustomRequest, CustomResponse, Pager } from '../../environment';
import { RECORDS_PER_PAGE } from '../../utils/constants';
import { createResponse, getDefaultSortOrder } from '../../utils/helper';
import { logger } from '../../utils/logger';
import RestaurantHelper from './restaurant.helper';
import { RestaurantModel } from './models';

class RestaurantController {
  async restaurantList(req: CustomRequest, res: CustomResponse) {
    try {
      let { search, rowNumber, recordsPerPage, sortOrder, sortBy, showAll } = req.body;
      rowNumber = rowNumber ? +rowNumber : 1;
      recordsPerPage = recordsPerPage ? +recordsPerPage : RECORDS_PER_PAGE;

      // Set sort order
      sortOrder = getDefaultSortOrder(sortOrder);
      const { orderBy, sortField } = RestaurantHelper.getRestaurantOrder(sortBy, sortOrder);

      const other = {
        order: orderBy,
        offset: !showAll ? rowNumber - 1 : undefined,
        limit: !showAll ? recordsPerPage : undefined,
      };

      let condition: any = [];
      // search filter
      if (search) {
        const filters = JSON.parse(search);
        condition = RestaurantHelper.getRestaurantFilters(filters);
      }
      // Get records
      const totalCount = !showAll ? await RestaurantModel.getTotal(condition) : undefined;
      const list = await RestaurantModel.getMany(condition, [], other);

      // If show all then pager will be empty
      const pager: Pager | {} = showAll
        ? {}
        : {
            sortField,
            sortOrder,
            rowNumber,
            recordsPerPage,
            filteredRecords: list.length,
            totalRecords: totalCount,
          };

      createResponse(res, STATUS_CODES.OK, res.__('Restaurant.LIST'), list, pager);
    } catch (error) {
      logger.error(__filename, 'restaurantList', req.custom.uuid, 'restaurantList', error);
      createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR'));
    }
  }
}

export default new RestaurantController();
