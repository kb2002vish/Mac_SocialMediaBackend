import  { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnec.js';
import User from './Users.js';

const Friend =  sequelize.define(
  'Friend',
  {
    // Model attributes are defined here
    user1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: User,
        key:'id',
    },
      onDelete:"CASCADE"
    },
    user2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: User,
        key:'id',
    },
      onDelete:"CASCADE"
    },
    state:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
  },
);
// Friend.sync()

// friendList=[
//   {id,state}
// ]

export default Friend;