✅ README.md — Backend TP Final (versión PRO)

🎯 API Backend · Gestión de Tareas (TP FINAL UTN)

API REST desarrollada para una aplicación completa de gestión de tareas con autenticación JWT, verificación por código de 6 dígitos, categorías personalizadas y CRUD de tareas.
Arquitectura organizada en capas: Controllers → Services → Repositories → MongoDB → Middlewares → Schemas.


---

🛠️ Stack Tecnológico

Node.js

Express

MongoDB + Mongoose

Joi (validaciones)

Nodemailer (envío de código de verificación)

JWT (Json Web Token)

Bcrypt (hash de contraseñas)

Vercel (deploy)



---

🌐 Despliegue

Backend desplegado en Vercel:
👉 (Acá pegás tu URL cuando la tengas)

Base de datos alojada en MongoDB Atlas, integrada mediante variables de entorno.


---

🚀 Características Principales

🔐 Autenticación Completa

Registro con validación (Joi)

Hash de contraseñas

Login con JWT

Middleware para proteger rutas privadas

Verificación de email con código de 6 dígitos generado y almacenado en la base de datos


📝 Gestión de Tareas (CRUD)

Crear tareas

Editar tareas

Eliminar tareas

Obtener todas las tareas del usuario

Filtrar por usuario con protección JWT


🗂️ Gestión de Categorías

Crear categorías personalizadas

Listar categorías del usuario

Eliminar categorías

Asociar tareas a categorías


🧱 Arquitectura Modular

Controllers limpios

Services con lógica de negocio

Repositories conectados a MongoDB

Middlewares de autenticación y validación

Schemas con Joi


---

⚙️ Variables de Entorno

Crear un archivo .env:

PORT=4000

# MongoDB
MONGO_DB_CONNECTION_STRING=

# JWT
JWT_SECRET=

# Email (verificación)
GMAIL_USER=
GMAIL_PASSWORD=

# URLs
URL_FRONTEND=
URL_BACKEND=

⚠️ IMPORTANTE:
Para Gmail debés usar Contraseña de aplicación, no la contraseña común.


---

🏗️ Instalación

# Clonar el repositorio
git clone <url>
cd backend

# Instalar dependencias
npm install


---

🏃‍♂️ Ejecución

Modo desarrollo

npm run dev

Producción

npm start


---

📡 Endpoints Principales

🔐 Autenticación

Método	Endpoint	Descripción

POST	/auth/register	Registrar nuevo usuario + enviar código
GET	/auth/verify	Verificar cuenta con código de 6 dígitos
POST	/auth/login	Iniciar sesión (devuelve JWT)



---

🗂️ Categorías (JWT requerido)

Método	Endpoint	Descripción

GET	/categories	Listar categorías del usuario
POST	/categories	Crear categoría
DELETE	/categories/:id	Eliminar categoría



---

📝 Tareas (JWT requerido)

Método	Endpoint	Descripción

GET	/tasks	Obtener todas las tareas del usuario
GET	/tasks/:id	Obtener tarea por ID
POST	/tasks	Crear tarea
PUT	/tasks/:id	Editar tarea
DELETE	/tasks/:id	Eliminar tarea



---

🔒 Seguridad

Hash de contraseñas con bcrypt

Tokens JWT firmados con JWT_SECRET

Validaciones con Joi antes de llegar a controllers

Middleware de autenticación que exige:


Authorization: Bearer <token>

Cada recurso está aislado por userId
(¡Un usuario no puede ver recursos de otro!)



---

🔄 Flujo Interno

Cliente → Router → Middleware → Controller → Service → Repository → MongoDB

Controllers → reciben requests y devuelven respuestas

Services → lógica de negocio

Repositories → consultas a Mongo

Schemas → validan datos

Middleware → protege rutas con JWT



---

🧪 Testing Manual Sugerido

Registro con email válido

Recibir código por email

Verificar con código correcto

Verificar con código incorrecto

Login con usuario verificado

CRUD completo de categorías

CRUD completo de tareas

Acceder sin token → 401

Token vencido → 401



---

🛠️ Troubleshooting

Error	Solución

❌ MongooseError: connection timed out	Revisar cadena de conexión de Mongo Atlas
❌ Email no enviado	Usar contraseña de aplicación en Gmail
❌ JWT inválido	Revisar si el frontend envía Bearer <token>
❌ Cannot GET /edit-task/...	Verificar rutas de React en frontend



---

👤 Autor

Abril Huari
Trabajo Final – UTN 💙

