import { createElement } from "../framework/mini-framework.js";
import { TaskItem } from "./TaskItem.jsx";

export function TaskList({ tasks, onToggle, onRemove, emptyMessage = "Todavía no hay tareas." }) {
    if (tasks.length === 0) {
        return <p className="empty-state">{emptyMessage}</p>;
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onRemove={onRemove}/>
            ))}
        </ul>
    );
}