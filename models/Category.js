import { Sequelize } from "sequelize";
module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    points_per_kg: { type: DataTypes.INTEGER, allowNull: false },
    icon: { type: DataTypes.STRING },
  }, { tableName: 'waste_categories' });

  return Category;
};