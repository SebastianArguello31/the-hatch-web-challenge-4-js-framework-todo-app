import { createElement, render } from "./framework/mini-framework.js";
import { actions, taskStore } from "./store/taskStore.js";
import { App } from "./App.jsx";
import "./styles.css";

const container = document.getElementById("app");

// Cada actualización entrega a App el estado vigente para que render lo compare con la vista anterior.
function updateView() {
    render(
        <App state={taskStore.getState()} actions={actions} />,
        container
    );
}

// La suscripción atiende cambios futuros. La llamada siguiente dibuja la pantalla inicial.
taskStore.subscribe(updateView);
updateView();