import  { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnec.js';

const User =  sequelize.define(
  'User',
  {
    // Model attributes are defined here
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true

    },
    email: {
      type: DataTypes.STRING,
      unique: true ,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
);
// User.sync()

// friendList=[
//   {id,state}
// ]

export default User;