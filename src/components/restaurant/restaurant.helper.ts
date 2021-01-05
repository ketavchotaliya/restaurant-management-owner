import { Op } from 'sequelize';
import { Order } from '../../environment';

class RestaurantHelper {
  getRestaurantOrder(sortBy: string, sortOrder: string): Order {
    let orderBy, sortField;
    if (sortBy) {
      if (['country_name', 'code', 'dial_code', 'is_active'].includes(sortBy)) {
        orderBy = [[sortBy, sortOrder]];
        sortField = sortBy;
      } else {
        orderBy = [['country_name', sortOrder]];
        sortField = 'country_name';
      }
    } else {
      orderBy = [['country_name', sortOrder]];
      sortField = 'country_name';
    }
    return { orderBy, sortField };
  }

  getRestaurantFilters(filters: any): object {
    let condition: any = [];
    for (var key in filters) {
      const data: any = filters[key];

      if (['country_name', 'code', 'dial_code'].includes(key)) {
        condition.push({
          [key]: { [Op.like]: `%${data}%` },
        });
      }
      if (key === 'is_active') {
        if (+data === 0 || +data === 1) {
          condition.push({
            [key]: data,
          });
        }
      }
    }
    return condition;
  }
}

export default new RestaurantHelper();
