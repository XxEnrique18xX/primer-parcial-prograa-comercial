import { Router } from 'express';
import {
  createProject, getProjects, getProject,
  updateProject, deleteProject, getProjectMembers
} from '../controllers/projects.controller.js';

const r = Router();

r.post('/', createProject);
r.get('/', getProjects);
r.get('/:id', getProject);
r.put('/:id', updateProject);
r.delete('/:id', deleteProject);
r.get('/:id/members', getProjectMembers);

export default r;
