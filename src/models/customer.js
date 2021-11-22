'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  customer.init({
    alicorp_cod: DataTypes.INTEGER,
    ci_number: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    account_type: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    state: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'customer',
  });
  return customer;
};