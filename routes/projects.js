const express = require('express');
const router = express.Router();

const {
  createProject,
  getProjectById,
  getAllProjects,
  getProjectColumns,
} = require('../controllers/projectController');

router.post('/', createProject);

router.get('/:projectId', getProjectById);

router.get('/columns/:projectId', getProjectColumns);

router.get('/', getAllProjects);

module.exports = router;
