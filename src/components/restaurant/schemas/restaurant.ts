import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../utils/dbConfig';

class Restaurant extends Model {
  public restaurant_id!: number;
  public restaurant_name!: string;
  public user_id!: number;
  public address!: string;
  public phone_number!: string;
  public open_time_1!: string;
  public close_time_1!: string;
  public open_time_2!: string;
  public close_time_2!: string;
  public is_restaurant_open!: number;
  public min_reservation_period!: number;
  public is_active!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public updated_by!: number;
}

Restaurant.init(
  {
    restaurant_id: {
      type: DataTypes.BIGINT(),
      autoIncrement: true,
      primaryKey: true,
    },
    restaurant_name: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    user_id: {
      type: new DataTypes.BIGINT(),
      allowNull: false,
    },
    address: {
      type: new DataTypes.STRING(),
    },
    phone_number: {
      type: new DataTypes.STRING(),
    },
    open_time_1: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    close_time_1: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    open_time_2: {
      type: new DataTypes.STRING(),
    },
    close_time_2: {
      type: new DataTypes.STRING(),
    },
    is_restaurant_open: {
      type: new DataTypes.TINYINT(),
      allowNull: false,
    },
    min_reservation_period: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    is_active: {
      type: new DataTypes.TINYINT(),
    },
    created_at: {
      type: new DataTypes.DATE(),
    },
    updated_at: {
      type: new DataTypes.DATE(),
    },
    updated_by: {
      type: new DataTypes.BIGINT(),
    },
  },
  {
    sequelize,
    tableName: 'restaurant',
    timestamps: false,
  }
);

export default Restaurant;
