import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnec.js';
import User from './Users.js';

const Post = sequelize.define(
  'Post',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true

    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',

    },
    heading: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
    ,
    comments: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    }
  },
);
// Post.sync()
export default Post;