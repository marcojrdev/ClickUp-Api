import express from 'express';
import {
    getAndStoreTasks,
    getAllInternalTasksController,
    createTask,
    deleteInternalTaskController
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/tasks/sync', getAndStoreTasks);
router.get('/tasks', getAllInternalTasksController);
router.post('/tasks', createTask);
router.delete('/tasks/:id', deleteInternalTaskController);

export default router;