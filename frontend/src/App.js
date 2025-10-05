import { useState, useEffect } from "react";
import {
  login,
  register,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./api";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("low");

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async () => {
    const res = await login(username, password);
    if (res.token) {
      setToken(res.token);
      setUsername("");
      setPassword("");
    } else {
      alert(res.message || "Error al iniciar sesión");
    }
  };

  const handleRegister = async () => {
    const res = await register(username, password);
    if (res.success) {
      alert("Usuario registrado. Ya puedes iniciar sesión.");
      setUsername("");
      setPassword("");
    } else {
      alert(res.message || "Error al registrarse");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setTasks([]);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    const res = await createTask(token, {
      title: newTaskTitle,
      description: newTaskDesc,
      priority: newTaskPriority,
      status: "todo",
    });
    setTasks([...tasks, res]);
    setNewTaskTitle("");
    setNewTaskDesc("");
    setNewTaskPriority("low");
  };

  const handleDelete = async (id) => {
    await deleteTask(token, id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleStatusChange = async (task, newStatus) => {
    const updatedTask = { ...task, status: newStatus };
    await updateTask(token, task.id, updatedTask);
    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
  };

  const handlePriorityChange = async (task, newPriority) => {
    const updatedTask = { ...task, priority: newPriority };
    await updateTask(token, task.id, updatedTask);
    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
  };

  if (!token) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Gestor de Tareas</h1>
        </header>
        <div className="auth-form">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Iniciar sesión</button>
          <button onClick={handleRegister}>Registrarse</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestor de Tareas</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <form className="task-form" onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Título de la tarea"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={newTaskDesc}
          onChange={(e) => setNewTaskDesc(e.target.value)}
        />
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
        <button type="submit">Agregar tarea</button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${task.status ? task.status.replace(" ", "-") : ""}`}
          >
            <h2>{task.title}</h2>
            <p>{task.description || "Sin descripción"}</p>
            <div className="task-meta">
              <span>Status: {task.status || "todo"}</span>
              <span>Prioridad: {task.priority || "low"}</span>
            </div>
            <div className="task-actions">
              <button onClick={() => handleDelete(task.id)}>Eliminar</button>
              <select
                value={task.status || "todo"}
                onChange={(e) => handleStatusChange(task, e.target.value)}
              >
                <option value="todo">Todo</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <select
                value={task.priority || "low"}
                onChange={(e) => handlePriorityChange(task, e.target.value)}
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
