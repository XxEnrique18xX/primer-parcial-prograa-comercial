import EmployeeModel from './Employee.js';
import ProjectModel from './Project.js';

let models; 

export function initModels(sequelize) {
  if (models) return models;

  const Employee = EmployeeModel(sequelize);
  const Project  = ProjectModel(sequelize);

  Employee.belongsTo(Project, {
    as: 'currentProject',
    foreignKey: { name: 'currentProjectId', allowNull: true },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  });

  Project.hasMany(Employee, {
    as: 'members',
    foreignKey: 'currentProjectId'
  });

  models = { Employee, Project };
  return models;
}

export function getModels() {
  if (!models) throw new Error('Models not initialized. Call initModels(sequelize) first.');
  return models;
}
