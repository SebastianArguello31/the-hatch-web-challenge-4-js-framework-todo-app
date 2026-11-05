import { createElement } from "./framework/mini-framework.js";
import { TaskForm } from "./components/TaskForm.jsx";
import { TaskList } from "./components/TaskList.jsx";
import { BotonAyuda } from "./components/BotonAyuda.jsx";
import { getVisibleTasks } from "./store/taskStore.js";

// Una lista sin tareas y un filtro sin coincidencias necesitan mensajes distintos.
function getEmptyMessage(total, filter) {
    if (total === 0) {
        return "Todavía no hay tareas.";
    }

    if (filter === "completed") {
        return "Todavía no hay tareas completadas.";
    }

    return "No quedan tareas pendientes.";
}

export function App({ state, actions }) {
    // Los contadores describen todas las tareas, mientras que TaskList recibe solo las que pasan el filtro.
    const total = state.tasks.length;
    const pending = state.tasks.filter((task) => !task.completed).length;
    const visibleTasks = getVisibleTasks(state.tasks, state.filter);

    return (
        <main className="todo-app">
            <header>
                <h1>Mis tareas</h1>

                <BotonAyuda showHelp={state.showHelp} onToggle={actions.toggleHelp}/>
            </header>

            <TaskForm onAdd={actions.addTask} />

            <section aria-labelledby="tasks-heading">
                <h2 id="tasks-heading">Lista de tareas</h2>

                <p aria-live="polite" aria-atomic="true">
                    Total: {total} · Pendientes: {pending}
                </p>

                <p>
                    <label htmlFor="task-filter">Mostrar tareas: </label>

                    <select id="task-filter" value={state.filter} onChange={(event) => actions.setFilter(event.currentTarget.value)}>
                        <option value="all">Todas</option>
                        <option value="pending">Pendientes</option>
                        <option value="completed">Completadas</option>
                    </select>
                </p>

                <TaskList tasks={visibleTasks} onToggle={actions.toggleTask} onRemove={actions.removeTask} emptyMessage={getEmptyMessage(total, state.filter)}/>
            </section>
        </main>
    );
}