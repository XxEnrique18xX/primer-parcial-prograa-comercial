import { initModels } from '../models/index.js';
import { sequelize } from '../db.js';

const { Project, Employee } = initModels(sequelize);

export const createProject = async (req, res) => {
  try {
    const proj = await Project.create(req.body);
    res.status(201).json(proj);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const getProjects = async (req, res) => {
  const includeInactive = String(req.query.includeInactive || 'false') === 'true';
  const where = includeInactive ? {} : { estado: true };
  const rows = await Project.findAll({ where });
  res.json(rows);
};


export const getProject = async (req, res) => {
  const proj = await Project.findByPk(req.params.id);
  if (!proj) return res.status(404).json({ error: 'Proyecto no encontrado' });
  res.json(proj);
};

export const updateProject = async (req, res) => {
  const proj = await Project.findByPk(req.params.id);
  if (!proj) return res.status(404).json({ error: 'Proyecto no encontrado' });
  try {
    await proj.update(req.body);
    res.json(proj);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const deleteProject = async (req, res) => {
  const proj = await Project.findByPk(req.params.id);
  if (!proj) return res.status(404).json({ error: 'Proyecto no encontrado' });

  await proj.update({ estado: false });
  res.json({ message: 'Proyecto eliminado', id: proj.id });
};


export const getProjectMembers = async (req, res) => {
  const proj = await Project.findByPk(req.params.id);
  if (!proj || !proj.estado) return res.status(404).json({ error: 'Proyecto no encontrado o inactivo' });

  const members = await Employee.findAll({ where: { currentProjectId: proj.id, estado: true } });
  res.json(members);
};

