let tasks = [];

const getAllInternalTasks = () => {
    return tasks;
};

const findInternalTaskById = (id) => {
    return tasks.find(task => task.id === id);
};

const upsertInternalTask = (task) => {
    const existingTaskIndex = tasks.findIndex(t => t.id === task.id);
    if (existingTaskIndex > -1) {
        tasks[existingTaskIndex] = { ...tasks[existingTaskIndex], ...task };
        return { updated: true, task: tasks[existingTaskIndex] };
    } else {
        tasks.push(task);
        return { created: true, task: task };
    }
};

const deleteInternalTask = (id) => {
    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    return tasks.length < initialLength;
};

export { getAllInternalTasks, findInternalTaskById, upsertInternalTask, deleteInternalTask };
