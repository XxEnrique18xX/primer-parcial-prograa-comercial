import { Router } from 'express';
import {
  createEmployee, getEmployees, getEmployee,
  updateEmployee, deleteEmployee,
  assignEmployee, unassignEmployee, getEmployeeProject
} from '../controllers/employees.controller.js';

const r = Router();

r.post('/', createEmployee);
r.get('/', getEmployees);
r.get('/:id', getEmployee);
r.put('/:id', updateEmployee);
r.delete('/:id', deleteEmployee);

r.post('/assign', assignEmployee);
r.post('/unassign', unassignEmployee);
r.get('/:id/project', getEmployeeProject);

export default r;
