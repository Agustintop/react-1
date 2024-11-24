import { useState } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== "") {
      const nuevaTareaObj = {
        id: Date.now(),
        descripcion: nuevaTarea,
        completada: false,
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea(""); // Limpiar el campo de texto
    }
  };

  const marcarCompletada = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>Lista De Tareas</h1>
        <div>
          <input
            type="text"
            placeholder="Nueva tarea"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
          />
          <button onClick={agregarTarea}>Agregar</button>
        </div>

        <ul>
          {tareas.map((tarea) => (
            <li key={tarea.id} style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
              <span>{tarea.descripcion}</span>
              <button onClick={() => marcarCompletada(tarea.id)}>
                {tarea.completada ? 'Desmarcar' : 'Marcar como completada'}
              </button>
              <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
