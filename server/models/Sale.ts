import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export class Sale extends Model {
  public id!: number;
  public productId!: number;
  public quantity!: number;
  public totalPrice!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'sales',
    timestamps: true,
  }
);