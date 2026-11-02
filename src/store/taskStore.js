import { createStore } from "../framework/mini-framework.js";

const initialState = {
    tasks: [],
    nextTaskId: 1,
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
            const exists = state.tasks.some((task) => task.id === id);

            if (!exists) {
                return state;
            }

            const tasks = state.tasks.map((task) => {
                if (task.id !== id) {
                    return task;
                }

                return {
                    ...task,
                    completed: !task.completed
                };
            });

            return { ...state, tasks };
        }

        case "task/remove": {
            const tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );

            if (tasks.length === state.tasks.length) {
                return state;
            }

            return { ...state, tasks };
        }

        case "help/toggle":
            return {
                ...state,
                showHelp: !state.showHelp
            };

        default:
            return state;
    }
}

export const taskStore = createStore(taskReducer, initialState);

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

    toggleHelp() {
        taskStore.dispatch({ type: "help/toggle" });
    }
};