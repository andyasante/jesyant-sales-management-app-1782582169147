import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../utils/db';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'staff';
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: 'admin' | 'staff';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize() {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM('admin', 'staff'),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'users',
      }
    );
  }
}

export { User, UserAttributes, UserCreationAttributes };