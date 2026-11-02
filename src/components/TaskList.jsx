import { createElement } from "../framework/mini-framework.js";
import { TaskItem } from "./TaskItem.jsx";

export function TaskList({ tasks }) {
    if (tasks.length === 0) {
        return <p className="empty-state">Todavía no hay tareas.</p>;
    } 

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    );
}