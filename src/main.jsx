import { createElement, render } from "./framework/mini-framework.js";
import { actions, taskStore } from "./store/taskStore.js";
import { App } from "./App.jsx";
import "./styles.css";

const container = document.getElementById("app");

function updateView() {
    render(
        <App state={taskStore.getState()} actions={actions} />,
        container
    );
}

taskStore.subscribe(updateView);
updateView();