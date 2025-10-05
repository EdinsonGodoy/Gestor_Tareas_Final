# DEMO - Credenciales de prueba

## Contenido del archivo

Este archivo contiene los usuarios de prueba cargados mediante `prisma/seed.js` en el backend.

---

## Usuarios de prueba

| Usuario   | Contraseña |
|----------|------------|
| edinson  | admin      |
| edi3     | 1234       |

---

## Uso del proyecto con usuarios de prueba

### Backend

1. Desde la carpeta `backend/` instala dependencias:
cd backend
npm install

2. Configura las variables de entorno en un archivo `.env` en la raíz de `backend/`:
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/gestor_tareas"
JWT_SECRET="tu_clave_secreta"
PORT=4000

3. Ejecuta las migraciones de Prisma y carga los datos de prueba:
npx prisma migrate dev --name init
node prisma/seed.js

4. Inicia el servidor backend:
npm run dev

El backend estará disponible en [http://localhost:4000/](http://localhost:4000/).

---

### Frontend

1. Desde la carpeta `frontend/` instala dependencias:
cd frontend
npm install

2. Inicia la aplicación React:
npm start

El frontend se abrirá en [http://localhost:3000/](http://localhost:3000/).

---

### Iniciar sesión con usuarios de prueba

- Usuario: `edinson` | Contraseña: `admin`  
- Usuario: `edi3` | Contraseña: `1234`

Una vez logueado, podrás:

- Crear nuevas tareas con título y descripción.  
- Modificar estado y prioridad de cada tarea.  
- Eliminar tareas.  
- Cerrar sesión y cambiar de usuario.

---

### Notas

- Estos usuarios ya están precargados mediante el `seed.js`.  
- Puedes registrar usuarios nuevos desde la interfaz de login si lo deseas.  
- Asegúrate de ejecutar **backend y frontend** para que el proyecto funcione correctamente.
