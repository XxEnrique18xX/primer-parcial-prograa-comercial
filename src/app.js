import express from 'express';
import 'dotenv/config';
import { sequelize } from './db.js';
import { initModels } from './models/index.js';

import employeesRoutes from './routes/employees.routes.js';
import projectsRoutes from './routes/projects.routes.js';

const app = express();
app.use(express.json());

app.use('/api/employees', employeesRoutes);
app.use('/api/projects', projectsRoutes);

app.get('/', (_req, res) => res.json({ ok: true, service: 'HR API' }));

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    initModels(sequelize);

    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    app.listen(PORT, () =>
      console.log(`HR API escuchando en http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('Error inicializando la BD:', err);
    process.exit(1);
  }
}

start();
