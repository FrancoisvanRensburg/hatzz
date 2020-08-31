const express = require('express');
const router = express.Router();

const {
  createTask,
  moveTask,
  movingTask,
} = require('../controllers/taskController');

router.post('/', createTask);

router.post('/moveTask', moveTask);

// router.post('/movingTask', movingTask);

module.exports = router;
