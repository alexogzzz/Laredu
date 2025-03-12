
# 📚 Laredu - Plataforma Escolar Completa

Sistema de gestión educativa desarrollado con **Laravel 11** para el backend y **React 19** + **Vite** + **Tailwind CSS 4** para el frontend.

---

## 🌐 Descripción General

**Laredu** es una plataforma escolar diseñada para facilitar la gestión integral de usuarios, cursos, asignaturas, tareas, evaluaciones, asistencia, eventos y comunicación entre los diferentes actores educativos.  
El backend expone una API REST robusta y segura usando **Laravel Sanctum**, mientras que el frontend es una SPA moderna, rápida y responsive.

---

## ⚙️ Tecnologías Utilizadas

| Tecnología               | Uso en el Proyecto              |
|-------------------------|---------------------------------|
| Laravel 11              | Backend y API REST              |
| React 19 + TypeScript   | Frontend dinámico               |
| Tailwind CSS 4          | Estilos modernos y responsivos  |
| Vite                    | Bundler rápido para el frontend |
| MySQL                   | Base de datos relacional        |
| Laravel Sanctum         | Autenticación vía API Tokens    |

---

## 🏗️ Estructura del Proyecto

```
laredu/
├── backend/        # Laravel 11 (API REST)
└── frontend/       # React 19 + Vite + Tailwind CSS 4
```

---

## 🚀 Instalación y Puesta en Marcha

### Backend (Laravel 11)

1. **Requisitos previos**:
   - PHP >= 8.2
   - Composer
   - MySQL 8 / MariaDB
   - Node.js + npm (para compilar el frontend)

2. **Pasos de instalación**:

   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
   ```

3. **Configuración base de datos** (.env):

   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laredu
   DB_USERNAME=root
   DB_PASSWORD=
   ```

4. **Autenticación**:
   - Laravel Sanctum para autenticación con API Tokens.
   - Endpoints protegidos con `auth:sanctum`.

---

### Frontend (React 19 + Vite + Tailwind CSS 4)

1. **Requisitos previos**:
   - Node.js (versión 18 o 20)
   - npm (versión 8+)

2. **Pasos de instalación**:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Configuración inicial**:
   - Proyecto creado con `npm create vite@latest .`
   - Framework seleccionado: React + TypeScript
   - Tailwind CSS 4 instalado y configurado vía plugin de Vite.

4. **Estructura básica**:

   ```
   frontend/
   ├── src/
   │   ├── components/    # Componentes UI (Login, Cursos, Asignaturas, etc.)
   │   ├── App.tsx        # App principal
   │   └── index.css      # Estilos globales con Tailwind CSS
   ├── vite.config.ts     # Configuración de Vite
   └── package.json
   ```

---

## 🔑 Funcionalidades Clave

### Backend (Laravel)

- Gestión de usuarios, roles y permisos.
- CRUD de cursos, asignaturas, tareas, entregas y eventos.
- Sistema de mensajería interna y notificaciones.
- Control de asistencia y evaluaciones.
- Autenticación con Laravel Sanctum.
- Seeders para crear datos iniciales de prueba.
- Controladores CRUD listos para la API REST.

### Frontend (React)

- Login y registro de usuarios.
- Listado de cursos, asignaturas y tareas.
- Entrega de tareas (submissions).
- Mensajería interna y notificaciones.
- Componente de logout con eliminación de token.
- Llamadas API usando `fetch` con autenticación Bearer Token.
- Diseño responsive con Tailwind CSS 4.

---

## 🛠️ Comandos de Uso Frecuente

### Backend

```bash
php artisan serve        # Inicia servidor Laravel
php artisan migrate      # Ejecuta migraciones
php artisan db:seed      # Rellena datos de prueba
```

### Frontend

```bash
npm run dev              # Inicia servidor de desarrollo React + Vite
npm run build            # Genera build de producción
```

---

## 📝 Endpoints de la API

| Método | Endpoint             | Descripción              |
|--------|----------------------|--------------------------|
| POST   | /api/register        | Registro de usuario      |
| POST   | /api/login           | Login de usuario         |
| POST   | /api/logout          | Cierre de sesión         |
| GET    | /api/me              | Obtener usuario logueado |
| GET    | /api/courses         | Listar cursos            |
| GET    | /api/subjects        | Listar asignaturas       |
| GET    | /api/assignments     | Listar tareas            |
| GET    | /api/submissions     | Listar entregas          |
| POST   | /api/messages        | Enviar mensaje privado   |

---
