# Gestor de Tareas - Proyecto Fullstack - Por Edinson Godoy y Conzuelo Ardiles

## Contenido del repositorio

Este repositorio contiene un gestor de tareas desarrollado con **Node.js + Express + Prisma + PostgreSQL** para el backend y **React** para el frontend.

Estructura del proyecto:

GESTOR_TAREAS_FINAL/
├── backend/      # Servidor y API
├── frontend/     # Interfaz de usuario
├── capturas/     # Capturas de pantalla
├── README.md     # Este archivo
└── DEMO.md       # Credenciales de prueba


---

## Capturas de pantalla

**Login:**  
![Login](capturas/login.png)

**Gestor de Tareas:**  
![Gestor](capturas/gestor.png)

**Endpoints probados:**  
![Endpoints](capturas/endpoints.png)

---
## Base de datos
npx prisma generate.
npx prisma migrate dev --name init

Qué hace cada uno:

1️⃣ npx prisma generate

Genera el cliente de Prisma (la librería que permite que el backend hable con PostgreSQL).

No modifica la base de datos.

2️⃣ npx prisma migrate dev --name init

Crea automáticamente la base de datos (si no existe aún).

Aplica las migraciones definidas en prisma/migrations/.

Crea las tablas (User, Task, etc.) basadas en el schema.prisma.

## Backend

### Instalación de dependencias

Desde la carpeta `backend/`:

cd backend  
npm install

### Variables de entorno

Crea un archivo `.env` en la raíz de `backend/` con estas variables:

DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/gestor_tareas"  
JWT_SECRET="tu_clave_secreta"  
PORT=4000

Ajusta `usuario` y `contraseña` según tu base de datos PostgreSQL.

### Migraciones y datos de prueba

Ejecuta las migraciones de Prisma y luego carga los usuarios y tareas de prueba:

npx prisma migrate dev --name init  
node prisma/seed.js

Esto creará usuarios y tareas de prueba.

**Usuarios incluidos en el seed:**

- Usuario: `edinson` | Contraseña: `admin`  
- Usuario: `edi3` | Contraseña: `1234`

### Ejecutar backend
node src/server.js (directo pero funcional)

npm run dev (NO ANDA porque hay que fixear partes del código)

El servidor correrá en [http://localhost:4000/](http://localhost:4000/).

### Endpoints principales

| Método | Endpoint             | Descripción                        |
| ------ | ------------------- | ---------------------------------- |
| POST   | `/api/auth/login`    | Iniciar sesión                     |
| POST   | `/api/auth/register` | Registrar usuario                  |
| GET    | `/api/tasks`         | Obtener tareas del usuario         |
| POST   | `/api/tasks`         | Crear tarea                        |
| PATCH  | `/api/tasks/:id`     | Actualizar tarea (status/priority)|
| DELETE | `/api/tasks/:id`     | Eliminar tarea                     |

Ejemplo de request para login:

POST /api/auth/login  
{  
  "username": "edi3",  
  "password": "1234"  
}

---

## Frontend

### Instalación de dependencias

Desde la carpeta `frontend/`:

cd frontend  
npm install

### Ejecutar frontend

npm start

La aplicación React se abrirá en [http://localhost:3000/](http://localhost:3000/).

---

## Uso del proyecto

1. Ejecuta el backend (`npm run dev`) para tener la API disponible.  
2. Ejecuta el frontend (`npm start`) para abrir la interfaz de usuario.  
3. Usa las credenciales de prueba del seed para iniciar sesión o registra un nuevo usuario.  
4. Desde el gestor de tareas puedes:
   - Crear nuevas tareas con título y descripción.
   - Modificar el estado y prioridad de cada tarea.
   - Eliminar tareas.
   - Cerrar sesión y cambiar de usuario.

---

## Notas finales

- La carpeta `capturas/` contiene imágenes de referencia de la aplicación en ejecución y los endpoints probados.  
- El archivo `DEMO.md` incluye las credenciales de prueba para testing rápido incluidas en el archivo seed.js.  
- Backend y frontend están separados, asegúrate de ejecutar ambos para que la aplicación funcione correctamente.
