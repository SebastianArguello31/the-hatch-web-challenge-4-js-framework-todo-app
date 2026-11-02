import { createElement, createStore, render } from "./framework/mini-framework.js";

import { App } from "./App.jsx";
import "./styles.css";

const initialState = {
    showHelp: false,
    tasks: [
        {
            id: 1,
            title: "Leer el enunciado del challenge",
            completed: true
        },
        {
            id: 2,
            title: "Preparar la presentación del framework",
            completed: false
        }
    ]
};

function reducer(state, action) {
    if (action.type === "help/toggle") {
        return {
            ...state,
            showHelp: !state.showHelp
        };
    }

    return state;
}

const store = createStore(reducer, initialState);
const container = document.getElementById("app");

function toggleHelp() {
    store.dispatch({ type: "help/toggle" });
}

function updateView() {
    render(
        <App state={store.getState()} onToggleHelp={toggleHelp} />,
        container
    );
}

store.subscribe(updateView);
updateView();