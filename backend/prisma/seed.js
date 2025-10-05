// backend/prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  // Crear usuario "edinson" (admin)
  const hashedPassword1 = await bcrypt.hash('admin', 10);
  const edinson = await prisma.user.create({
    data: {
      username: 'edinson',
      password: hashedPassword1,
    },
  });

  // Crear usuario "edi3"
  const hashedPassword2 = await bcrypt.hash('1234', 10);
  const edi3 = await prisma.user.create({
    data: {
      username: 'edi3',
      password: hashedPassword2,
    },
  });

  // Crear tareas de prueba para edi3
  await prisma.task.createMany({
    data: [
      {
        title: 'Tarea de ejemplo 1',
        description: 'Primera tarea para demo',
        status: 'todo',
        priority: 'medium',
        userId: edi3.id,
      },
      {
        title: 'Tarea de ejemplo 2',
        description: 'Segunda tarea para demo',
        status: 'in progress',
        priority: 'high',
        userId: edi3.id,
      },
      {
        title: 'Tarea de ejemplo 3',
        description: 'Tercera tarea para demo',
        status: 'done',
        priority: 'low',
        userId: edi3.id,
      },
    ],
  });

  console.log('Datos de prueba insertados correctamente.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
