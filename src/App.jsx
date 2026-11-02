import { createElement } from "./framework/mini-framework.js";
import { TaskForm } from "./components/TaskForm.jsx";
import { TaskList } from "./components/TaskList.jsx";

export function App({ state, actions }) {
    const total = state.tasks.length;
    const pending = state.tasks.filter((task) => !task.completed).length;

    return (
        <main className="todo-app">
            <header>
                <h1>Mis tareas</h1>

                <button type="button" className="help-button" aria-expanded={state.showHelp} aria-controls="help-content" onClick={actions.toggleHelp}>
                    {state.showHelp ? "Ocultar ayuda" : "Mostrar ayuda"}
                </button>

                <div id="help-content">
                    {state.showHelp && (
                        <p>
                            Escribe una tarea y pulsa Agregar o Enter.
                            Usa la casilla para marcarla como completada o pendiente.
                        </p>
                    )}
                </div>
            </header>

            <TaskForm onAdd={actions.addTask} />

            <section aria-labelledby="tasks-heading">
                <h2 id="tasks-heading">Lista de tareas</h2>

                <p aria-live="polite" aria-atomic="true">
                    Total: {total} · Pendientes: {pending}
                </p>

                <TaskList tasks={state.tasks} onToggle={actions.toggleTask} onRemove={actions.removeTask}/>
            </section>
        </main>
    );
}