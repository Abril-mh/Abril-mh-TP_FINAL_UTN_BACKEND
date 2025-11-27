🎯 API Backend · Gestión de Tareas

API REST desarrollada para una aplicación de gestión de tareas con autenticación JWT, verificación de correo electrónico, categorías personalizadas y CRUD completo de tareas.
Arquitectura organizada y escalable en capas: Controllers → Services → Repositories → MongoDB.


---

🛠️ Stack Tecnológico

- Node.js
- MongoDB
- joi
- express
- nodemailer



---

🌐 Despliegue

Backend en Vercel: https://abril-mh-tp-final-utn-backend.vercel.app

Base de Datos MongoDB Atlas: conexión configurada vía variables de entorno



---

🚀 Características Principales

🔐 Autenticación con JWT (login, protección de rutas)

✉️ Verificación de cuenta por email (con token firmado)

🧑‍💼 Registro de usuarios con validación robusta

🗂️ Gestión completa de categorías

📝 CRUD de tareas asociadas a usuario y categoría

✔️ Validación de datos con Joi

🧱 Arquitectura modular, limpia y escalable

🛠️ Middlewares de errores y autenticación

📬 Servicios desacoplados (auth, mail, tasks, categories)



---

⚙️ Variables de Entorno

Crea un archivo .env:

PORT=4000

# MongoDB
MONGO_DB_CONNECTION_STRING=

# JWT
JWT_SECRET=

# Email
GMAIL_USER=
GMAIL_PASSWORD=

# URLs
URL_FRONTEND=
URL_BACKEND=

> ⚠️ IMPORTANTE:
Para Gmail debés usar Contraseña de aplicación (no la contraseña común).




---

🏗️ Instalación

# Clonar el repo
git clone <repo>
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

POST	/auth/register	Registro + envío de email
GET	/auth/verify	Verificación de cuenta
POST	/auth/login	Inicio de sesión (devuelve JWT)



---

🗂️ Categorías (Requiere JWT)

Método	Endpoint	Descripción

GET	/categories	Listar categorías del usuario
POST	/categories	Crear categoría
DELETE	/categories/:id	Eliminar categoría



---

📝 Tareas (Requiere JWT)

Método	Endpoint	Descripción

GET	/tasks	Obtener todas las tareas del usuario
POST	/tasks	Crear tarea
PUT	/tasks/:id	Editar tarea
DELETE	/tasks/:id	Eliminar tarea



---

🔒 Seguridad Implementada

Hash de contraseñas con bcrypt

Tokens JWT firmados con JWT_SECRET

Validaciones con Joi en cada request crítica

Middleware que exige:
Authorization: Bearer <token>

Evita accesos a datos de otros usuarios



---

🔄 Flujo Interno de Datos

Cliente → Router → Middleware → Controller → Service → Repository → MongoDB

Controllers: reciben y devuelven datos

Services: contienen la lógica de negocio

Repositories: interactúan con la base de datos

Schemas: validan el body antes de procesar



---

🧪 Testing (Opcional por si lo agregás después)

npm test


---

🛠️ Troubleshooting (Errores Comunes)

❌ MongooseError: connection timed out
✔ Revisá la cadena de conexión MongoDB Atlas

❌ No llega el email
✔ Activar “Contraseña de aplicación” en Google

❌ JWT inválido
✔ Revisar que el frontend envíe Bearer token



---

👤 Autor

Abril Huari
Trabajo Final – UTN
[ver Documentacion tecnica](/DOCUMENTACION.md)
