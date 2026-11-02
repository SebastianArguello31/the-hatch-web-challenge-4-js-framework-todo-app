import { createElement } from "../framework/mini-framework.js";

export function TaskForm({ onAdd }) {
    function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const input = form.elements.namedItem("title");
        const title = input.value.trim();

        if (title === "") {
            input.setCustomValidity("Escribe una tarea que contenga algo más que espacios.");
            input.reportValidity();
            return;
        }

        onAdd(title);
        form.reset();
        input.focus();
    }

    function clearValidation(event) {
        event.currentTarget.setCustomValidity("");
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <label htmlFor="task-title">Nueva tarea</label>

            <div className="task-form-row">
                <input id="task-title" name="title" type="text" placeholder="Ejemplo: repasar el Virtual DOM" required={true} onInput={clearValidation}/>

                <button type="submit">Agregar</button>
            </div>
        </form>
    );
}