import axios from "axios";
import config from "../config/index.js";
import { ApiError } from "../utils/errorHandler.js ";

const { clickUpApiKey, clickUpApiUrl } = config;

const clickupApi = axios.create({
    baseURL: clickUpApiUrl,
    headers: {
        Authorization: clickUpApiKey,
        'Content-Type': 'application/json',
    },
});

const getClickUpTasks = async (listId) => {
    try {
        const url = `/list/${listId}/task`;
        const fullUrl = clickupApi.defaults.baseURL + url; 
        
        const response = await clickupApi.get(url); 
        return response.data.tasks;
    } catch (error) {
        console.error('Erro ao buscar tarefas do ClickUp:', error.response ? error.response.data : error.message);
        throw new ApiError('Não foi possível conectar ao ClickUp para buscar tarefas.', error.response ? error.response.status : 500);
    }
};

const createClickUpTask = async (listId, taskData) => {
    try {
        const response = await clickupApi.post(`/list/${listId}/task`, taskData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar tarefa no ClickUp:', error.response ? error.response.data : error.message);
        throw new ApiError('Não foi possível criar a tarefa no ClickUp.', error.response ? error.response.status : 500);
    }
};

export { getClickUpTasks, createClickUpTask };