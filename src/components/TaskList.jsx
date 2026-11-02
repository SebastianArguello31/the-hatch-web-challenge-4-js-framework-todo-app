import { createElement } from "../framework/mini-framework.js";
import { TaskItem } from "./TaskItem.jsx";

export function TaskList({ tasks, onToggle, onRemove, emptyMessage = "Todavía no hay tareas." }) {
    // App entrega las tareas visibles: esta lista puede estar vacía aunque haya tareas en otro filtro.
    if (tasks.length === 0) {
        return <p className="empty-state">{emptyMessage}</p>;
    }

    // La clave estable permite al framework reconocer la misma fila cuando cambia su posición.
    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onRemove={onRemove}/>
            ))}
        </ul>
    );
}