📘 DOCUMENTACIÓN TÉCNICA – Backend (TP FINAL UTN)

Este documento describe a fondo la arquitectura, capas, flujo, middlewares, modelos y validaciones del backend.


---

📁 1. Estructura de Carpetas

backend/
├─ config/
│   └─ configMongoDB.config.js
│   └─ enviroment.config.js
│   └─ mailTransporter.config.js
├─ controllers/
│   ├─ auth.controller.js
│   ├─ category.controller.js
│   └─ task.controller.js
├─ middlewares/
│   ├─ auth.middleware.js
│   ├─ validateRequest.middleware.js
│   └─ errorHandler.middleware.js
├─ models/
│   ├─ user.model.js
│   ├─ category.model.js
│   └─ task.model.js
├─ repositories/
│   ├─ user.repository.js
│   ├─ category.repository.js
│   └─ task.repository.js
├─ routers/
│   ├─ auth.router.js
│   ├─ category.router.js
│   └─ task.router.js
├─ schemas/
│   ├─ auth.schema.js
│   ├─ category.schema.js
│   └─ task.schema.js
├─ services/
│   ├─ auth.service.js
│   ├─ category.service.js
│   └─ task.service.js
├─ utils/
│   ├─ sendEmail.js
│   ├─ token.js
└─ error.js
└─ main.js

---

🧱 2. Arquitectura por Capas

1. Controllers

Reciben la request, llaman al service y devuelven respuesta limpia.

2. Services

Contienen la lógica de negocio:

Crear usuario

Generar código

Validar verify

CRUD de tareas y categorías


3. Repositories

Consultas directas a MongoDB vía Mongoose.

Ejemplo:

findAllByUserId: (userId) => Task.find({ userId }),

4. Middlewares

Validación con Joi

Autenticación con JWT

Manejo de errores centralizado


5. Models

Modelan las colecciones:

User

Task

Category



---

🔐 3. Autenticación + Verificación

Registro

1. Hash de contraseña


2. Generación de código de 6 dígitos


3. Guardado del usuario


4. Envío de email con Nodemailer



Verificación

User ingresa email y código

Si coincide → verified = true

Devuelve JWT


Login

Comprueba email + password

Si no está verificado → no permite ingresar

Devuelve token JWT



---

📝 4. Tareas (Tasks)

Cada tarea tiene:

title

description

status: pendiente | completada

categoryId

userId (para filtrar por usuario)


El service controla:

Validación

Permisos

Respuestas limpias



---

🗂️ 5. Categorías (Categories)

Propiedades:

name

userId


Reglas:

Cada usuario solo ve sus categorías

No se pueden ver categorías de otros



---

🧪 6. Validaciones (Schemas)

Ejemplo con Joi:

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

Se aplican con:

validateRequest(authSchema)


---

🔌 7. Conexión a MongoDB

Usa:

mongoose.connect(config.MONGO_DB_CONNECTION_STRING)

Reconecta en caso de error.


---

✉️ 8. Servicio de Email

Nodemailer envía un correo con:

Código de verificación

Mensaje personalizado


Plantilla HTML incluida.


---

🔄 9. Flujo Interno Completo

Request →
Router →
validateRequest (Joi) →
authMiddleware (si aplica) →
Controller →
Service →
Repository →
MongoDB →
Response JSON


---

🛡️ 10. Seguridad

✔ Hash con bcrypt
✔ JWT firmado
✔ Tokens expirables
✔ Middleware de autenticación
✔ Protección por userId
✔ Validación completa con Joi
✔ Sanitización básica

