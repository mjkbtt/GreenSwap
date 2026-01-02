import { Sequelize } from "sequelize";
module.exports = (sequelize ) => {
  const Products = sequelize.define('Products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price_points: { type: DataTypes.INTEGER, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    image_url: { type: DataTypes.STRING },
  }, { tableName: 'products'});
  return Products;
}