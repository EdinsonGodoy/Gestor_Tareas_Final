const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las tareas del usuario
const getTasks = async (req, res) => {
  try {
    const userId = Number(req.user.userId);
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener tareas: ${error.message}` });
  }
};

// Obtener tarea por ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = Number(req.user.userId);

    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: "Tarea no encontrada o no tienes permiso" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener tarea: ${error.message}` });
  }
};

// Crear tarea
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const userId = Number(req.user.userId);

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "todo",
        priority: priority || "low",
        dueDate: dueDate ? new Date(dueDate) : null,
        userId,
      },
    });

    res.status(201).json({ message: "Tarea creada correctamente", task: newTask });
  } catch (error) {
    res.status(500).json({ error: `Error al crear tarea: ${error.message}` });
  }
};

// Actualizar tarea completa
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;
    const userId = Number(req.user.userId);

    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: "Tarea no encontrada o no tienes permiso" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, status, priority, dueDate },
    });

    res.json({ message: "Tarea actualizada correctamente", task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: `Error al actualizar tarea: ${error.message}` });
  }
};

// Actualizar solo status
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = Number(req.user.userId);

    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: "Tarea no encontrada o no tienes permiso" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json({ message: "Estado actualizado correctamente", task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: `Error al actualizar estado: ${error.message}` });
  }
};

// Eliminar tarea
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = Number(req.user.userId);

    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: "Tarea no encontrada o no tienes permiso" });
    }

    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: `Error al eliminar tarea: ${error.message}` });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, updateTaskStatus, deleteTask };
