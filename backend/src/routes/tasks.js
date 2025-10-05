const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require('../controllers/tasksController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Todas las rutas requieren token
router.use(authMiddleware);

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id/status', updateTaskStatus); // endpoint PATCH
router.delete('/:id', deleteTask);

module.exports = router;
