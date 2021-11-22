'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  notice.init({
    notice_name: DataTypes.STRING,
    image: DataTypes.STRING,
    pdf: DataTypes.STRING,
    state: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'notice',
  });
  return notice;
};