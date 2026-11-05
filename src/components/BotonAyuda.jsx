import { createElement } from "../framework/mini-framework.js";

export function BotonAyuda({ showHelp, onToggle }) {
    return (
        <div>
            <button type="button" className="help-button" aria-expanded={showHelp} aria-controls="help-content" onClick={onToggle}>
                {showHelp ? "Ocultar ayuda" : "Mostrar ayuda"}
            </button>

            <div id="help-content">
                {showHelp && (
                    <p>
                        Escribe una tarea y pulsa Agregar o Enter.
                        Usa la casilla para cambiar su estado y el filtro
                        para elegir qué tareas ver.
                    </p>
                )}
            </div>
        </div>
    );
}