import { createElement } from "../framework/mini-framework.js";

export function TaskItem({ task }) {
    return (
        <li className="task-item" data-task-id={task.id}>
            <label className="task-label">
                <input type="checkbox" checked={task.completed} disabled={true}/>

                <span className={task.completed ? "task-title completed" : "task-title"}>
                    {task.title}
                </span>
            </label>

            <button type="button" className="delete-button" aria-label={`Eliminar tarea: ${task.title}`} disabled={true}>
                Eliminar
            </button>
        </li>
    );
}