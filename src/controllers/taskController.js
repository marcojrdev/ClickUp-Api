import { getClickUpTasks, createClickUpTask } from "../services/clickupService.js";
import { upsertInternalTask, getAllInternalTasks, deleteInternalTask } from "../services/internalStorageService.js";

import config from "../config/index.js ";
import { ApiError, handleError } from "../utils/errorHandler.js";

const { clickUpListId } = config;

const mapClickUpTaskToInternal = (clickUpTask) => ({
   id: clickUpTask.id,
    title: clickUpTask.name,
    description: clickUpTask.description || '',
    status: clickUpTask.status ? clickUpTask.status.status : 'unknown',
    startDate: clickUpTask.start_date ? new Date(parseInt(clickUpTask.start_date)).toISOString() : null,
    dueDate: clickUpTask.due_date ? new Date(parseInt(clickUpTask.due_date)).toISOString() : null,
});

const getAndStoreTasks = async (req, res) => {
    try {
        const clickUpTasks = await getClickUpTasks(clickUpListId);
        const processedTasks = clickUpTasks.map(task => {
            const internalTask = mapClickUpTaskToInternal(task);
            upsertInternalTask(internalTask);
            return internalTask;
        });
        res.status(200).json({ message: 'Tarefas sincronizadas com sucesso!', tasks: processedTasks });
    } catch (error) {
        handleError(error, res);
    }
};

const getAllInternalTasksController = (req, res) => {
    try {
        const tasks = getAllInternalTasks();
        res.status(200).json({ tasks });
    } catch (error) {
        handleError(error, res);
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description, status, startDate, dueDate } = req.body;

        if (!title) {
            throw new ApiError('O título da tarefa é obrigatório.', 400);
        }

        const taskPayload = {
            name: title,
            description: description || '',
            status: status || 'To Do',
            start_date: startDate ? new Date(startDate).getTime() : undefined,
            due_date: dueDate ? new Date(dueDate).getTime() : undefined,
        };

        const newClickUpTask = await createClickUpTask(clickUpListId, taskPayload);
        const internalTask = mapClickUpTaskToInternal(newClickUpTask);
        upsertInternalTask(internalTask);

        res.status(201).json({ message: 'Tarefa criada com sucesso no ClickUp e armazenada internamente!', task: internalTask });
    } catch (error) {
        handleError(error, res);
    }
};

const deleteInternalTaskController = (req, res) => {
    try {
        const { id } = req.params;
        const wasDeleted = deleteInternalTask(id);

        if (!wasDeleted) {
            throw new ApiError('Tarefa não encontrada no armazenamento interno para exclusão.', 404);
        }
        res.status(200).json({ message: 'Tarefa excluída do armazenamento interno com sucesso!' });
    } catch (error) {
        handleError(error, res);
    }
};

export {
    getAndStoreTasks,
    getAllInternalTasksController,
    createTask,
    deleteInternalTaskController,
};
