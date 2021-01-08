import { Transaction } from 'sequelize';
import { Tables } from '../schemas';
import { Tables as TablesType } from '../types';

class TablesModel {
  async addOne(tablesObj: TablesType, transaction: Transaction | undefined = undefined): Promise<TablesType> {
    try {
      const insertedObj = await Tables.create(tablesObj, {
        transaction: transaction ? transaction : undefined,
      });
      return insertedObj;
    } catch (error) {
      throw error;
    }
  }

  async addMany(tablesArr: TablesType[], transaction: Transaction | undefined = undefined): Promise<TablesType[]> {
    try {
      return await Tables.bulkCreate(tablesArr, { transaction: transaction ? transaction : undefined });
    } catch (error) {
      throw error;
    }
  }

  async getSingle(whereObj: any): Promise<TablesType | null> {
    try {
      return await Tables.findOne({
        where: whereObj,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateOne(whereObj: {}, tablesObj: TablesType, transaction: Transaction | undefined = undefined): Promise<any> {
    try {
      await Tables.update(tablesObj, {
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
      const count: number = await Tables.count({
        where: condition,
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  async getMany(condition: any = {}, attributes: string[] = [], other: object = {}): Promise<TablesType[]> {
    try {
      return await Tables.findAll({
        attributes: attributes.length > 0 ? attributes : undefined,
        where: condition,
        ...other,
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(condition: any = {}): Promise<any> {
    try {
      return await Tables.destroy({
        where: condition,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new TablesModel();
