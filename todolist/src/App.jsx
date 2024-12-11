import { useState } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [error, setError] = useState(""); 

  const agregarTarea = () => {

    if (tareas.some((tarea) => tarea.descripcion.toLowerCase() === nuevaTarea.toLowerCase())) {
      setError("¡La tarea ya existe!"); 
    } else if (nuevaTarea.trim() !== "") {

      const nuevaTareaObj = {
        id: Date.now(),
        descripcion: nuevaTarea,
        completada: false,
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea(""); 
      setError(""); 
    } else {
      setError("Por favor, ingresa una tarea válida."); 
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

  // Función para borrar todas las tareas
  const borrarTodasTareas = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar todas las tareas?")) {
      setTareas([]); // Limpiar todas las tareas
    }
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

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button onClick={borrarTodasTareas} style={{ marginTop: '10px' }}>
          Borrar todas las tareas
        </button>

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
