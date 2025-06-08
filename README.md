# 🚀 API CRUD Artículos

API REST desarrollada con **NestJS** para la gestión completa de artículos, incluyendo operaciones CRUD, filtros avanzados, validación de datos y documentación interactiva.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso de la API](#-uso-de-la-api)
- [Endpoints](#-endpoints)
- [Documentación Swagger](#-documentación-swagger)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Estructura del Proyecto](#️-estructura-del-proyecto)
- [Variables de Entorno](#-variables-de-entorno)
- [Testing](#-testing)
- [Despliegue](#-despliegue)
- [Soporte](#-soporte)

## ✨ Características

- ✅ **CRUD Completo** de artículos
- ✅ **Filtros Avanzados** (ID, nombre parcial, estado activo)
- ✅ **Paginación** con límites configurables
- ✅ **Health Check** para monitoreo de estado
- ✅ **Rate Limiting** para prevenir abuso
- ✅ **Validación de Datos** con class-validator
- ✅ **Documentación Swagger** interactiva
- ✅ **Seguridad con API Key**
- ✅ **Base de datos PostgreSQL**
- ✅ **Eliminación Lógica** (desactivación)
- ✅ **Arquitectura Modular** y escalable
- ✅ **Dockerización** completa
- ✅ **Logging** profesional con NestJS Logger
- ✅ **TypeScript** con tipado estricto

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **NestJS** | ^10.0.0 | Framework principal |
| **TypeScript** | ^5.1.3 | Lenguaje de programación |
| **PostgreSQL** | 15-alpine | Base de datos |
| **TypeORM** | ^0.3.17 | ORM para base de datos |
| **Swagger** | ^7.1.0 | Documentación API |
| **class-validator** | ^0.14.0 | Validación de DTOs |
| **Docker** | ^24.0.5 | Containerización |
| **pnpm** | ^10.10.0 | Gestor de paquetes |

## 📋 Requisitos Previos

- **Node.js** >= 20.14.0
- **pnpm** >= 10.10.0
- **Docker** >= 24.0.5
- **Docker Compose** >= 2.0.0

## 🚀 Instalación y Configuración

### Opción 1: Con Docker (Recomendado)

```bash
# 1. Clonar el repositorio
git clone https://github.com/Kmicac/crud-articulos.git
cd crud-articulos

# 2. Construir y ejecutar con Docker
docker-compose up --build

# ✅ La API estará disponible en: http://localhost:3000
# ✅ Swagger en: http://localhost:3000/api/docs
```

### Opción 2: Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Kmicac/crud-articulos.git
cd crud-articulos

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# 4. Iniciar PostgreSQL (con Docker)
docker run --name postgres-articles \
  -e POSTGRES_PASSWORD=passwordcamilojpg \
  -e POSTGRES_DB=articles_db \
  -p 5432:5432 -d postgres:15-alpine

# 5. Ejecutar la aplicación
pnpm run start:dev
```

## 🔧 Uso de la API

### Autenticación

Todas las rutas requieren un header de autenticación:

```http
X-API-KEY: aquiTengo-Mysecret-Key
```

### Base URL

```
http://localhost:3000/api/v1
```

## 📚 Endpoints

### 🏥 Health Check

Verifica el estado de la API y la base de datos:

```http
GET /api/v1/health
```

**Respuesta:**
```json
{
  "status": "ok",
  "timestamp": "2025-06-07T16:51:02.040Z",
  "uptime": 135.333,
  "database": "connected",
  "responseTime": "38ms",
  "version": "0.0.1",
  "environment": "development"
}
```

### 📝 Crear Artículo

```http
POST /api/v1/articles
Content-Type: application/json
X-API-KEY: aquiTengo-Mysecret-Key

{
  "nombre": "Laptop Dell Inspiron 15",
  "marca": "Dell",
  "activo": true
}
```

**Respuesta:**
```json
{
  "id": 1,
  "nombre": "Laptop Dell Inspiron 15",
  "marca": "Dell",
  "activo": true,
  "fechaCreacion": "2024-06-06T20:30:00.000Z",
  "fechaModificacion": "2024-06-06T20:30:00.000Z"
}
```

### 📋 Listar Artículos (con Paginación)

```http
GET /api/v1/articles
X-API-KEY: aquiTengo-Mysecret-Key
```

**Con filtros y paginación:**
```http
GET /api/v1/articles?nombre=laptop&activo=true&page=1&limit=5
```

**Parámetros de consulta:**
- `id` - Filtrar por ID exacto
- `nombre` - Búsqueda parcial en el nombre
- `activo` - Filtrar por estado (true/false)
- `page` - Número de página (default: 1)
- `limit` - Elementos por página (default: 10)

**Respuesta paginada:**
```json
{
  "data": [
    {
      "id": 1,
      "nombre": "Laptop Dell Inspiron 15",
      "marca": "Dell",
      "activo": true,
      "fechaCreacion": "2024-06-06T20:30:00.000Z",
      "fechaModificacion": "2024-06-06T20:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 14,
    "totalPages": 3,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

### 🔍 Obtener Artículo por ID

```http
GET /api/v1/articles/1
X-API-KEY: aquiTengo-Mysecret-Key
```

### ✏️ Actualizar Artículo

```http
PUT /api/v1/articles/1
Content-Type: application/json
X-API-KEY: aquiTengo-Mysecret-Key

{
  "nombre": "Laptop Dell Inspiron 16",
  "marca": "Dell"
}
```

> **Nota:** Puedes actualizar uno o varios campos. El campo `fechaModificacion` se actualiza automáticamente.

### 🗑️ Desactivar Artículo

```http
DELETE /api/v1/articles/1
X-API-KEY: aquiTengo-Mysecret-Key
```

**Respuesta:**
```json
{
  "message": "Artículo desactivado correctamente",
  "article": {
    "id": 1,
    "nombre": "Laptop Dell Inspiron 15",
    "marca": "Dell",
    "activo": false,
    "fechaCreacion": "2024-06-06T20:30:00.000Z",
    "fechaModificacion": "2024-06-06T20:35:00.000Z"
  }
}
```

## 📖 Documentación Swagger

### Acceso a Swagger

Visita: **http://localhost:3000/api/docs**

### Funcionalidades de Swagger

- 📋 **Documentación completa** de todos los endpoints
- 🔧 **Interfaz interactiva** para probar la API
- 🔐 **Configuración de API Key** desde la interfaz
- 📊 **Esquemas de datos** detallados
- 💡 **Ejemplos** de peticiones y respuestas

### Configurar API Key en Swagger

1. Abre Swagger: `http://localhost:3000/api/docs`
2. Haz clic en **"Authorize"** (🔒)
3. Ingresa: `aquiTengo-Mysecret-Key`
4. Haz clic en **"Authorize"**
5. ¡Ya puedes probar todos los endpoints!

## 💡 Ejemplos de Uso

### Crear varios artículos

```bash
# Artículo 1
curl -X POST http://localhost:3000/api/v1/articles \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: aquiTengo-Mysecret-Key" \
  -d '{
    "nombre": "iPhone 15 Pro",
    "marca": "Apple"
  }'

# Artículo 2
curl -X POST http://localhost:3000/api/v1/articles \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: aquiTengo-Mysecret-Key" \
  -d '{
    "nombre": "Samsung Galaxy S24",
    "marca": "Samsung"
  }'
```

### Búsqueda con filtros y paginación

```bash
# Buscar artículos activos que contengan "phone" (primera página, 5 elementos)
curl -X GET "http://localhost:3000/api/v1/articles?nombre=phone&activo=true&page=1&limit=5" \
  -H "X-API-KEY: aquiTengo-Mysecret-Key"

# Buscar artículo específico por ID
curl -X GET "http://localhost:3000/api/v1/articles?id=1" \
  -H "X-API-KEY: aquiTengo-Mysecret-Key"

# Verificar estado de la API
curl -X GET "http://localhost:3000/api/v1/health" \
  -H "X-API-KEY: aquiTengo-Mysecret-Key"
```

## 🗂️ Estructura del Proyecto

Este repositorio contiene múltiples componentes organizados en diferentes ramas:

### Rama Principal
- **`main`** - API REST completa de CRUD de artículos

### Ramas de Ejercicios Técnicos
- **`feature/ejercicios-javascript`** - Soluciones de ejercicios de JavaScript ES6+
  - Números impares entre 0 y 100
  - Clase para manejo de sueldos de operarios
  - Clase Alumno con validaciones
  - Ejercicios de arrays y funciones modernas
  
- **`feature/sql-queries`** - Consultas SQL para sistema de empleados
  - Consultas de filtrado y ordenamiento
  - Joins entre tablas relacionadas
  - Funciones de agregación y agrupamiento
  - Consultas complejas con múltiples condiciones

### Navegación entre Ramas

```bash
# Ver todas las ramas disponibles
git branch -a

# Cambiar a una rama específica
git checkout feature/javascript-exercises
git checkout feature/sql-queries

# Volver a la rama principal
git checkout main
```

## 🔐 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=passwordcamilojpg
DB_DATABASE=articles_db

# Aplicación
NODE_ENV=development
PORT=3000
API_KEY=aquiTengo-Mysecret-Key
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Tests unitarios
pnpm run test 

# Tests específicos del ArticlesService
pnpm run test articles.service

# Tests con coverage
pnpm run test:cov

```

## 🚀 Despliegue

### Producción con Docker

```bash
# 1. Construir imagen de producción
docker build -t crud-articulos-api .

# 2. Ejecutar en producción
docker run -d \
  --name crud-articulos-api \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DB_HOST=tu-db-host \
  -e DB_PASSWORD=tu-password-seguro \
  crud-articulos-api
```

### Variables de Entorno para Producción

```env
NODE_ENV=production
DB_HOST=tu-host-de-produccion
DB_PORT=5432
DB_USERNAME=tu-usuario
DB_PASSWORD=tu-password-super-seguro
DB_DATABASE=articles_production
API_KEY=tu-api-key-super-segura
PORT=3000
```

---

## 🎯 Próximas Posibles Funcionalidades

- [ ] Autenticación JWT más robusta
- [ ] Logs de auditoría de cambios
- [ ] Categorías de artículos
- [ ] Búsqueda full-text avanzada
- [ ] Métricas y monitoring
- [ ] Tests de integración completos

---