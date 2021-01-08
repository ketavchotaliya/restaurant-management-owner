import { Transaction } from 'sequelize';
import { Tables } from '../../tables/schemas';
import { Restaurant } from '../schemas';
import { Restaurant as RestaurantType } from '../types';

class RestaurantModel {
  async addOne(
    restaurantObj: RestaurantType,
    transaction: Transaction | undefined = undefined
  ): Promise<RestaurantType> {
    try {
      const insertedObj = await Restaurant.create(restaurantObj, {
        transaction: transaction ? transaction : undefined,
      });
      return insertedObj;
    } catch (error) {
      throw error;
    }
  }

  async addMany(
    restaurantArr: RestaurantType[],
    transaction: Transaction | undefined = undefined
  ): Promise<RestaurantType[]> {
    try {
      return await Restaurant.bulkCreate(restaurantArr, { transaction: transaction ? transaction : undefined });
    } catch (error) {
      throw error;
    }
  }

  async getSingle(whereObj: any): Promise<RestaurantType | null> {
    try {
      return await Restaurant.findOne({
        where: whereObj,
      });
    } catch (error) {
      throw error;
    }
  }

  async getDetails(whereObj: any): Promise<any> {
    try {
      return await Restaurant.findAll({
        where: whereObj,
        include: [
          {
            model: Tables,
            as: 'tables',
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async updateOne(
    whereObj: {},
    restaurantObj: RestaurantType,
    transaction: Transaction | undefined = undefined
  ): Promise<any> {
    try {
      await Restaurant.update(restaurantObj, {
        where: whereObj,
        transaction: transaction ? transaction : undefined,
      });
      return;
    } catch (error) {
      throw error;
    }
  }

  async getTotal(condition: any = {}): Promise<number> {
    try {
      const count: number = await Restaurant.count({
        where: condition,
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  async getMany(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<RestaurantType[]> {
    try {
      return await Restaurant.findAll({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new RestaurantModel();
