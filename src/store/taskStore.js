import { createStore } from "../framework/mini-framework.js";
import { loadTaskData, saveTaskData } from "./taskStorage.js";

const filters = ["all", "pending", "completed"];

const initialState = {
    ...loadTaskData(),
    filter: "all",
    showHelp: false
};

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

    if (state.tasks !== previousTasks) {
        saveTaskData(state);
        previousTasks = state.tasks;
    }
});

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