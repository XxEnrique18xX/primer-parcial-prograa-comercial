import { initModels } from '../models/index.js';
import { sequelize } from '../db.js';

const { Employee, Project } = initModels(sequelize);

export const createEmployee = async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json(emp);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const getEmployees = async (req, res) => {
  const includeInactive = String(req.query.includeInactive || 'false') === 'true';
  const where = includeInactive ? {} : { estado: true };

  const rows = await Employee.findAll({
    where,
    include: [{ model: Project, as: 'currentProject' }]
  });
  res.json(rows);
};


export const getEmployee = async (req, res) => {
  const emp = await Employee.findByPk(req.params.id, { include: [{ model: Project, as: 'currentProject' }] });
  if (!emp) return res.status(404).json({ error: 'Empleado no encontrado' });
  res.json(emp);
};

export const updateEmployee = async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ error: 'Empleado no encontrado' });
  try {
    await emp.update(req.body);
    res.json(emp);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteEmployee = async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ error: 'Empleado no encontrado' });

  await emp.update({ estado: false });
  res.json({ message: 'Empleado eliminado', id: emp.id });
};


export const assignEmployee = async (req, res) => {
  const { employeeId, projectId } = req.body;

  const emp = await Employee.findByPk(employeeId);
  if (!emp || !emp.estado) return res.status(404).json({ error: 'Empleado no encontrado o inactivo' });

  const proj = await Project.findByPk(projectId);
  if (!proj || !proj.estado) return res.status(404).json({ error: 'Proyecto no encontrado o inactivo' });

  await emp.update({ currentProjectId: projectId });
  const updated = await Employee.findByPk(employeeId, { include: [{ model: Project, as: 'currentProject' }] });
  res.json(updated);
};


export const unassignEmployee = async (req, res) => {
  const { employeeId } = req.body;

  const emp = await Employee.findByPk(employeeId);
  if (!emp) return res.status(404).json({ error: 'Empleado no encontrado' });

  await emp.update({ currentProjectId: null });
  res.json({ message: 'Empleado desasignado' });
};

export const getEmployeeProject = async (req, res) => {
  const emp = await Employee.findByPk(req.params.id, {
    include: [{ model: Project, as: 'currentProject', where: { estado: true }, required: false }]
  });
  if (!emp) return res.status(404).json({ error: 'Empleado no encontrado' });
  res.json(emp.currentProject || null);
};

