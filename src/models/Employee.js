import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Employee = sequelize.define('Employee', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    firstName:  { type: DataTypes.STRING(80),  allowNull: false },
    lastName:   { type: DataTypes.STRING(80),  allowNull: false },
    email:      { type: DataTypes.STRING(120), allowNull: false, unique: true, validate: { isEmail: true } },
    phone:      { type: DataTypes.STRING(30) },
    position:   { type: DataTypes.STRING(80) },
    department: { type: DataTypes.STRING(80) },
    hireDate:   { type: DataTypes.DATEONLY, allowNull: false },
    salary:     { type: DataTypes.DECIMAL(12,2), defaultValue: 0.00 },
    address:    { type: DataTypes.STRING(255) },
    estado:     { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    tableName: 'employees',
    timestamps: true
  });

  return Employee;
};
