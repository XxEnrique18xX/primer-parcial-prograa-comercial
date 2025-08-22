import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Project = sequelize.define('Project', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name:        { type: DataTypes.STRING(120), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    startDate:   { type: DataTypes.DATEONLY, allowNull: false },
    endDate:     { type: DataTypes.DATEONLY, allowNull: true },
    completion:  { type: DataTypes.DECIMAL(5,2), allowNull: false, defaultValue: 0.00, validate: { min: 0, max: 100 } },
    status:      { type: DataTypes.ENUM('planned','active','completed','on_hold'), defaultValue: 'planned' },
    estado:      { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    tableName: 'projects',
    timestamps: true
  });

  return Project;
};
