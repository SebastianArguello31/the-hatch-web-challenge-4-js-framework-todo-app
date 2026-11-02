import { createElement } from "../framework/mini-framework.js";

export function TaskForm({ onAdd }) {
    function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const input = form.elements.namedItem("title");
        // required detecta el campo vacío; trim permite detectar también un título compuesto solo por espacios.
        const title = input.value.trim();

        if (title === "") {
            input.setCustomValidity("Escribe una tarea que contenga algo más que espacios.");
            input.reportValidity();
            return;
        }

        // El formulario comunica el título al store y devuelve el foco al campo para escribir la siguiente tarea.
        onAdd(title);
        form.reset();
        input.focus();
    }

    // Al editar el campo se retira el error personalizado para que el navegador permita un nuevo envío.
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