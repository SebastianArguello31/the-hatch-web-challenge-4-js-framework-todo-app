import { createElement } from "./framework/mini-framework.js";
import { TaskForm } from "./components/TaskForm.jsx";
import { TaskList } from "./components/TaskList.jsx";

export function App({ state, onToggleHelp }) {
    return (
        <main className="todo-app">
            <header>
                <h1>Mis tareas</h1>

                <button type="button" className="help-button" aria-expanded={state.showHelp} aria-controls="help-content" onClick={onToggleHelp}>
                    {state.showHelp ? "Ocultar ayuda" : "Mostrar ayuda"}  
                </button>

                <div id="help-content">
                    {state.showHelp && (<p>Una tarea pendiente es aquella que todavía tienes por completar.</p>)}
                </div>
            </header>

            <TaskForm />

            <section aria-labelledby="tasks-heading">
                <h2 id="tasks-heading">Lista de tareas</h2>
                <TaskList tasks={state.tasks} />
            </section>
        </main>
    );
}