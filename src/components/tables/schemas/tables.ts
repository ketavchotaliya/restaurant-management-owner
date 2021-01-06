import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../utils/dbConfig';

class Tables extends Model {
  public table_id!: number;
  public restaurant_id!: number;
  public table_no!: string;
  public table_size!: string;
  public is_active!: number;
}

Tables.init(
  {
    table_id: {
      type: DataTypes.BIGINT(),
      autoIncrement: true,
      primaryKey: true,
    },
    restaurant_id: {
      type: new DataTypes.BIGINT(),
      allowNull: false,
    },
    table_no: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    table_size: {
      type: new DataTypes.STRING(),
    },
    is_active: {
      type: new DataTypes.TINYINT(),
    },
  },
  {
    sequelize,
    tableName: 'tables',
    timestamps: false,
  }
);

export default Tables;
