const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  ispremiumuser:{
    type: Boolean,
    default: false
  },
  totalExpenses:{
    type: Number,
    default: 0
  }
})


const User = mongoose.model('User', userSchema);

module.exports = User;


// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');


// //id, name , password, phone number, role

// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: Sequelize.STRING,
//     email: {
//        type:  Sequelize.STRING,
//        allowNull: false,
//        unique: true
//     },
//     password: Sequelize.STRING,
//     ispremiumuser: {
//       type:  Sequelize.BOOLEAN,
//       defaultValue : false, 
//     },
//     totalExpenses: {
//       type :Sequelize.INTEGER,
//       defaultValue: 0,
//     }
// })

// module.exports = User;