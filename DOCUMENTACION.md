📘 DOCUMENTACIÓN TÉCNICA – FRONTEND (TP FINAL UTN)

Este documento describe la arquitectura, los componentes, la navegación, el flujo interno, comunicación con backend, hooks, contextos y middleware del frontend creado para el TP Final UTN.


---

📁 1. Estructura del Proyecto

frontend/
├─ src/
│  ├─ config/
│  │   └─ environment.js
│  ├─ context/
│  │   └─ AuthContext.jsx
│  ├─ hooks/
│  │   ├─ useFetch.js
│  │   └─ useForm.js
│  ├─ middleware/
│  │   └─ AuthMiddleware.jsx
│  ├─ screens/
│  │   ├─ LoginScreen.jsx
│  │   ├─ RegisterScreen.jsx
│  │   ├─ VerificationScreen.jsx
│  │   ├─ HomeScreen.jsx
│  │   ├─ CategoriesScreen.jsx
│  │   ├─ CreateTaskScreen.jsx
│  │   └─ EditTaskScreen.jsx
│  ├─ services/
│  │   ├─ authService.js
│  │   ├─ taskService.js
│  │   └─ categoryService.js
│  ├─ router/
│  │   └─ AppRouter.jsx
│  └─ main.jsx
└─ package.json


---

🌐 2. Configuración Global

2.1. environment.js

Define la URL base del backend y permite que el proyecto funcione de forma local o en producción:

const ENVIRONMENT = {
  URL_API: import.meta.env.VITE_APP_API_URL
};

export default ENVIRONMENT;

En Vercel se configura la variable:

VITE_APP_API_URL = https://abril-mh-tp-final-utn-backend.vercel.app


---

🔐 3. Autenticación

El proyecto tiene un AuthContext, un AuthMiddleware y pantallas dedicadas a login/registro/verificación.


---

📌 3.1. AuthContext.jsx

Responsabilidades:

Guardar al usuario autenticado.

Decodificar el token JWT.

Mantener persistencia con localStorage.

Cerrar sesión.

Redirigir cuando el token es inválido o expiró.


Flujo interno:

1. Al iniciar, intenta leer token desde localStorage.


2. Si existe → lo decodifica y guarda la información.


3. Si no es válido → borra sesión.


4. Provee funciones:

loginUser(token)

logoutUser()

isLogged





---

🛣️ 3.2. AuthMiddleware.jsx

Protege rutas privadas.

Si el usuario no está autenticado, redirige a "/login".

Uso en router:
<Route 
  path="/home" 
  element={
    <AuthMiddleware>
        <HomeScreen />
    </AuthMiddleware>
  }
  />


---

🔑 3.3. Flujo de Autenticación Completo

Registro

1. Usuario envía email + contraseña.


2. Backend crea el usuario.


3. Backend envía código de verificación por email.



Verificación

1. Usuario ingresa a VerificationScreen.


2. Envia email + código recibido.


3. Backend responde con token JWT.


4. AuthContext guarda token y redirige al Home.



Login

1. Usuario ingresa email + contraseña.


2. Si está verificado → backend devuelve token.


3. AuthContext lo guarda.


4. Redirige a Home.




---

⚙️ 4. Hooks Personalizados


---

📌 4.1 useForm.js

Maneja estados de formularios.

Devuelve:

form

handleChange

resetForm



Uso típico:

const { form, handleChange } = useForm({ email: "", password: "" });


---

📌 4.2 useFetch.js

Realiza peticiones GET, POST, PUT, DELETE.

Maneja loading y error automáticamente.

Tiene soporte para token JWT.


const { data, loading, error, execute } = useFetch("/tasks", "GET");


---

🧭 5. Enrutamiento (Router)

El router define rutas públicas y privadas:

Rutas Públicas

/login

/register

/verification


Rutas Privadas

/home → Listado de tareas

/categories → CRUD de categorías

/task/create → Crear tarea

/task/edit/:id → Editar tarea



---

🧩 6. Pantallas (Screens)


---

🔹 6.1 LoginScreen

Formulario de email y password.

Llama a login() desde authService.js.

Si el usuario no está verificado → redirige a VerificationScreen.



---

🔹 6.2 RegisterScreen

Formulario de registro.

Llama a register() del backend.

Notifica por pantalla que revise su correo.



---

🔹 6.3 VerificationScreen

Pide email + código de verificación.

Llama a verifyUser() del backend.

Guarda token en AuthContext.

Redirige al Home.



---

🔹 6.4 HomeScreen

Carga todas las tareas del usuario.

Permite ver estado, categoría, descripción.

Botones para:

Editar tarea

Eliminar tarea




---

🔹 6.5 CategoriesScreen

CRUD completo de categorías.

Utiliza categoryService.js.



---

🔹 6.6 CreateTaskScreen

Formulario para crear tarea:

Título

Descripción

Categoría

Estado inicial: pendiente



---

🔹 6.7 EditTaskScreen

Igual que CreateTaskScreen, pero:

Carga los datos de la tarea por ID.

Permite actualizar.



---

🔌 7. Servicios (Services)


---

7.1 authService.js

login(email, password)

register(form)

verifyUser(email, code)


Usa:

await fetch(`${ENVIRONMENT.URL_API}/auth/login`);


---

7.2 taskService.js

Funciones:

getTasks()

createTask()

updateTask()

deleteTask()



---

7.3 categoryService.js

Funciones:

getCategories()

createCategory()

updateCategory()

deleteCategory()



---

🔐 8. Persistencia con localStorage

Se guardan:

token

user decodificado


Se elimina al:

Cerrar sesión

Expirar token

Error de autenticación



---

🚀 9. Despliegue en Vercel

Variables necesarias:

VITE_APP_API_URL=https://abril-mh-tp-final-utn-backend.vercel.app

Build Command:

npm run build

Output:

dist/


---

🧪 10. Pruebas

10.1 Pruebas manuales

Login con credenciales válidas

Login con usuario no verificado

Registro de usuario nuevo

Verificación con código válido

Verificación con código incorrecto

CRUD completo de categorías

CRUD completo de tareas



---

🛡️ 11. Manejo de Errores

Ejemplos:

Token inválido → cerrar sesión automáticamente.

Backend caído → mensaje de error general.

Error de validación → mensaje en pantalla.



---

🧱 12. Buenas prácticas aplicadas

DRY: Servicios reutilizables.

YAGNI: Código mínimo necesario.

KISS: Arquitectura simple.

Estados globales con Context API.

Componentes claros y separados.

Hooks reutilizables.



---

🎉 FIN DE DOCUMENTACIÓN
