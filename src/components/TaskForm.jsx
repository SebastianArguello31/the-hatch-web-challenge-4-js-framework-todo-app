import { createElement } from "../framework/mini-framework.js";

export function TaskForm() {
    function preventSubmit(event) {
        event.preventDefault();
    }

    return (
        <form className="task-form" onSubmit={preventSubmit}>
            <label htmlFor="task-title">Nueva tarea</label>

            <div className="task-form-row">
                <input id="task-title" name="title" type="text" placeholder="Ejemplo: repasar el Virtual DOM" required={true}/>

                <button type="submit" disabled={true}>
                    Agregar
                </button>
            </div>
        </form>
    );
}