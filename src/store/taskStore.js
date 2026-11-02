import { createStore } from "../framework/mini-framework.js";
import { loadTaskData, saveTaskData } from "./taskStorage.js";

const filters = ["all", "pending", "completed"];

// Al recargar se recuperan las tareas y su próximo id. La ayuda y el filtro empiezan con sus valores iniciales.
const initialState = {
    ...loadTaskData(),
    filter: "all",
    showHelp: false
};

// El reducer calcula el siguiente estado. Devolver la referencia anterior evita notificar un cambio inexistente.
export function taskReducer(state, action) {
    switch (action.type) {
        case "task/add": {
            if (typeof action.payload !== "string") {
                return state;
            }

            const title = action.payload.trim();

            if (title === "") {
                return state;
            }

            const task = {
                id: state.nextTaskId,
                title,
                completed: false
            };

            return {
                ...state,
                tasks: [...state.tasks, task],
                nextTaskId: state.nextTaskId + 1
            };
        }

        case "task/toggle": {
            const id = action.payload;

            if (!state.tasks.some((task) => task.id === id)) {
                return state;
            }

            // Solo la tarea seleccionada recibe un objeto nuevo; las demás conservan su referencia.
            const tasks = state.tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            );

            return { ...state, tasks };
        }

        case "task/remove": {
            const tasks = state.tasks.filter((task) => task.id !== action.payload);

            if (tasks.length === state.tasks.length) {
                return state;
            }

            return { ...state, tasks };
        }

        case "filter/set": {
            const filter = action.payload;

            if (!filters.includes(filter) || filter === state.filter) {
                return state;
            }

            return { ...state, filter };
        }

        case "help/toggle":
            return { ...state, showHelp: !state.showHelp };

        default:
            return state;
    }
}

// El filtro selecciona las filas que se muestran sin eliminar tareas del estado.
export function getVisibleTasks(tasks, filter) {
    if (filter === "pending") {
        return tasks.filter((task) => !task.completed);
    }

    if (filter === "completed") {
        return tasks.filter((task) => task.completed);
    }

    return tasks;
}

export const taskStore = createStore(taskReducer, initialState);

let previousTasks = initialState.tasks;

taskStore.subscribe(() => {
    const state = taskStore.getState();

    // Abrir la ayuda o cambiar el filtro conserva el array de tareas y evita una escritura en localStorage.
    if (state.tasks !== previousTasks) {
        saveTaskData(state);
        previousTasks = state.tasks;
    }
});

// Los componentes llaman a estos métodos con un título o id; dispatch entrega la acción al reducer.
export const actions = {
    addTask(title) {
        taskStore.dispatch({ type: "task/add", payload: title });
    },

    toggleTask(id) {
        taskStore.dispatch({ type: "task/toggle", payload: id });
    },

    removeTask(id) {
        taskStore.dispatch({ type: "task/remove", payload: id });
    },

    setFilter(filter) {
        taskStore.dispatch({ type: "filter/set", payload: filter });
    },

    toggleHelp() {
        taskStore.dispatch({ type: "help/toggle" });
    }
};