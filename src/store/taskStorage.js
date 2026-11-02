const STORAGE_KEY = "ch4.todo.v1";

function emptyTaskData() {
    return { tasks: [], nextTaskId: 1 };
}

function isValidTaskData(data) {
    if (
        data === null ||
        typeof data !== "object" ||
        !Array.isArray(data.tasks) ||
        !Number.isSafeInteger(data.nextTaskId) ||
        data.nextTaskId < 1
    ) {
        return false;
    }

    const ids = new Set();

    for (const task of data.tasks) {
        if (
            task === null ||
            typeof task !== "object" ||
            !Number.isSafeInteger(task.id) ||
            task.id < 1 ||
            task.id >= data.nextTaskId ||
            ids.has(task.id) ||
            typeof task.title !== "string" ||
            task.title.trim() === "" ||
            typeof task.completed !== "boolean"
        ) {
            return false;
        }

        ids.add(task.id);
    }

    return true;
}

export function loadTaskData() {
    if (typeof window === "undefined") {
        return emptyTaskData();
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);

        if (raw === null) {
            return emptyTaskData();
        }

        const data = JSON.parse(raw);

        if (!isValidTaskData(data)) {
            console.warn("Los datos guardados del TODO tienen un formato inválido.");
            return emptyTaskData();
        }

        return {
            tasks: data.tasks,
            nextTaskId: data.nextTaskId
        };
    } catch (error) {
        console.warn("No se pudieron recuperar las tareas guardadas.", error);
        return emptyTaskData();
    }
}

export function saveTaskData({ tasks, nextTaskId }) {
    if (typeof window === "undefined") {
        return;
    }

    try {
        const raw = JSON.stringify({ tasks, nextTaskId });
        window.localStorage.setItem(STORAGE_KEY, raw);
    } catch (error) {
        console.warn("Las tareas siguen en memoria, pero no se pudieron guardar.", error);
    }
}