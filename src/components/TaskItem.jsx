import { createElement } from "../framework/mini-framework.js";

// La casilla y el tachado reflejan el mismo valor de completed. Cada acción usa el id aunque dos títulos coincidan.
export function TaskItem({ task, onToggle, onRemove }) {
    return (
        <li className="task-item" data-task-id={task.id}>
            <label className="task-label">
                <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)}/>

                <span className={task.completed ? "task-title completed" : "task-title"}>
                    {task.title}
                </span>
            </label>

            <button type="button" className="delete-button" aria-label={`Eliminar tarea: ${task.title}`} onClick={() => onRemove(task.id)}>
                Eliminar
            </button>
        </li>
    );
}