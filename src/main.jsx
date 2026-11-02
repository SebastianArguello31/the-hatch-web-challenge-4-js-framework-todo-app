import { createElement, createStore, render } from "./framework/mini-framework.js";

import "./styles.css";

function reducer(state, action) {
    if (action.type === "help/toggle") {
        return {
            ...state,
            showHelp: !state.showHelp
        };
    }

    return state;
}

const store = createStore(reducer, { showHelp: false });
const container = document.getElementById("app");

function toggleHelp() {
    store.dispatch({ type: "help/toggle" });
}

function App({ showHelp }) {
    return (
        <main className="todo-app">
            <h1>Mis tareas</h1>
            <p>Organiza tus tareas y consulta cuáles quedan pendientes.</p>

            <button type="button" aria-expanded={showHelp} aria-controls="help-content" onClick={toggleHelp}>
                {showHelp ? "Ocultar ayuda" : "Mostrar ayuda"}
            </button>

            <div id="help-content">
                {showHelp && (<p>Una tarea pendiente es aquella que todavía tienes por completar.</p>)}
            </div>
        </main>
    );
}

function updateView() {
    render(<App showHelp={store.getState().showHelp} />, container);
}

store.subscribe(updateView);
updateView();