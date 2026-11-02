import test from "node:test";
import assert from "node:assert/strict";

import { createStore } from "../src/framework/mini-framework.js";
import { taskReducer, getVisibleTasks } from "../src/store/taskStore.js";

function initialState() {
    return {
        tasks: [],
        nextTaskId: 1,
        showHelp: false,
        filter: "all"
    };
}

function add(state, title) {
    return taskReducer(state, { type: "task/add", payload: title });
}

test("agregar limpia el título, asigna un id y conserva el estado anterior", () => {
    const before = initialState();
    const after = add(before, "  Ensayar la demo  ");

    assert.deepEqual(after.tasks, [
        { id: 1, title: "Ensayar la demo", completed: false }
    ]);
    assert.equal(after.nextTaskId, 2);
    assert.deepEqual(before.tasks, []);
    assert.equal(before.nextTaskId, 1);
});

test("un título vacío, compuesto por espacios o inválido conserva el estado", () => {
    const state = initialState();

    for (const title of ["", "   ", null, 123]) {
        assert.equal(add(state, title), state);
    }
});

test("dos títulos iguales se pueden completar, desmarcar y eliminar por separado", () => {
    const state = add(add(initialState(), "Estudiar"), "Estudiar");
    const marked = taskReducer(state, { type: "task/toggle", payload: 2 });

    assert.deepEqual(marked.tasks.map((task) => task.completed), [false, true]);
    assert.deepEqual(state.tasks.map((task) => task.completed), [false, false]);

    const unmarked = taskReducer(marked, { type: "task/toggle", payload: 2 });
    assert.equal(unmarked.tasks[1].completed, false);

    const remaining = taskReducer(marked, { type: "task/remove", payload: 1 });
    assert.deepEqual(remaining.tasks, [
        { id: 2, title: "Estudiar", completed: true }
    ]);
});

test("eliminar la última tarea y crear otra conserva la secuencia de ids", () => {
    const first = add(initialState(), "Primera");
    const empty = taskReducer(first, { type: "task/remove", payload: 1 });
    const next = add(empty, "Segunda");

    assert.equal(empty.tasks.length, 0);
    assert.equal(next.tasks[0].id, 2);
});

test("cada filtro selecciona las filas correctas y conserva la lista completa", () => {
    const state = add(add(initialState(), "Leer"), "Practicar");
    const marked = taskReducer(state, { type: "task/toggle", payload: 1 });
    const filtered = taskReducer(marked, {
        type: "filter/set",
        payload: "completed"
    });

    assert.equal(filtered.filter, "completed");
    assert.equal(filtered.tasks, marked.tasks);

    const ids = (filter) =>
        getVisibleTasks(filtered.tasks, filter).map((task) => task.id);

    assert.deepEqual(ids("all"), [1, 2]);
    assert.deepEqual(ids("pending"), [2]);
    assert.deepEqual(ids("completed"), [1]);
});

test("acciones sin efecto conservan la referencia al estado", () => {
    const state = add(initialState(), "Leer");

    for (const action of [
        { type: "task/remove", payload: 999 },
        { type: "task/toggle", payload: 999 },
        { type: "filter/set", payload: "all" },
        { type: "filter/set", payload: "desconocido" },
        { type: "unknown" }
    ]) {
        assert.equal(taskReducer(state, action), state);
    }
});

test("el store integrado notifica cambios reales y permite cancelar la suscripción", () => {
    const store = createStore(taskReducer, initialState());
    const totals = [];

    const unsubscribe = store.subscribe(() => {
        totals.push(store.getState().tasks.length);
    });

    store.dispatch({ type: "task/add", payload: "Leer" });
    store.dispatch({ type: "task/remove", payload: 999 });
    store.dispatch({ type: "task/remove", payload: 1 });
    unsubscribe();
    store.dispatch({ type: "task/add", payload: "Practicar" });

    assert.deepEqual(totals, [1, 0]);
    assert.equal(store.getState().tasks[0].title, "Practicar");
});