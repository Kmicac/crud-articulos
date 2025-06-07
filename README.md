<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

🚀 API CRUD Artículos
API REST desarrollada con NestJS para la gestión completa de artículos, incluyendo operaciones CRUD, filtros avanzados, validación de datos y documentación interactiva.

📋 Tabla de Contenidos
Características
Tecnologías
Requisitos Previos
Instalación y Configuración
Uso de la API
Endpoints
Documentación Swagger
Ejemplos de Uso
Estructura del Proyecto
Variables de Entorno
Testing

✨ Características
✅ CRUD Completo de artículos
✅ Filtros Avanzados (ID, nombre parcial, estado activo)
✅ Validación de Datos con class-validator
✅ Documentación Swagger interactiva
✅ Seguridad con API Key
✅ Base de datos PostgreSQL
✅ Eliminación Lógica (desactivación)
✅ Arquitectura Modular y escalable
✅ Dockerización completa
✅ Logging profesional con NestJS Logger
✅ TypeScript con tipado estricto

🚀 Instalación y Configuración

Opción 1: Con Docker 

# 1. Clonar el repositorio
git clone https://github.com/Kmicac/crud-articulos.git
cd crud-articulos

# 2. Construir y ejecutar con Docker
docker-compose up --build

# ✅ La API estará disponible en: http://localhost:3000
# ✅ Swagger en: http://localhost:3000/api/docs


Opción 2: Instalación Local

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
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=articles_db \
  -p 5432:5432 -d postgres:15-alpine

# 5. Ejecutar la aplicación
pnpm run start:dev

🔧 Uso de la API
Autenticación
Todas las rutas requieren un header de autenticación:

http
X-API-KEY: aquiTengo-Mysecret-Key

Base URL

http://localhost:3000/api/v1

📚 Endpoints
📝 Crear Artículo

http
POST /api/v1/articles
Content-Type: application/json
X-API-KEY: aquiTengo-Mysecret-Key

{
  "nombre": "Laptop Dell Inspiron 15",
  "marca": "Dell",
  "activo": true
}

Respuesta:

json{
  "id": 1,
  "nombre": "Laptop Dell Inspiron 15",
  "marca": "Dell",
  "activo": true,
  "fechaCreacion": "2024-06-06T20:30:00.000Z",
  "fechaModificacion": "2024-06-06T20:30:00.000Z"
}

📋 Listar Artículos

http
GET /api/v1/articles
X-API-KEY: aquiTengo-Mysecret-Key

📝
Con filtros opcionales:

http
GET /api/v1/articles?nombre=laptop&activo=true&id=1

Parámetros de consulta:

id - Filtrar por ID exacto
nombre - Búsqueda parcial en el nombre
activo - Filtrar por estado (true/false)

🔍 Obtener Artículo por ID
http
GET /api/v1/articles/1
X-API-KEY: aquiTengo-Mysecret-Key

✏️ Actualizar Artículo
http
PUT /api/v1/articles/1
Content-Type: application/json
X-API-KEY: aquiTengo-Mysecret-Key

{
  "nombre": "Laptop Dell Inspiron 16",
  "marca": "Dell"
}

Nota: Puedes actualizar uno o varios campos. El campo fechaModificacion se actualiza automáticamente.

🗑️ Desactivar Artículo

http

DELETE /api/v1/articles/1
X-API-KEY: aquiTengo-Mysecret-Key

Respuesta:

json{
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

📖 Documentación Swagger

Acceso a Swagger
Visita: http://localhost:3000/api/docs

Funcionalidades de Swagger

📋 Documentación completa de todos los endpoints
🔧 Interfaz interactiva para probar la API
🔐 Configuración de API Key desde la interfaz
📊 Esquemas de datos detallados
💡 Ejemplos de peticiones y respuestas

Configurar API Key en Swagger

1. Abre Swagger: http://localhost:3000/api/docs
2. Haz clic en "Authorize" (🔒)
3. Ingresa: aquiTengo-Mysecret-Key
4. Haz clic en "Authorize"
5. Ya puedes probar todos los endpoints!


💡 Ejemplos de Uso

Crear varios artículos

bash

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


  Búsqueda con filtros

bash

# Buscar artículos activos que contengan "phone"
curl -X GET "http://localhost:3000/api/v1/articles?nombre=phone&activo=true" \
  -H "X-API-KEY: aquiTengo-Mysecret-Key"

# Buscar artículo específico por ID
curl -X GET "http://localhost:3000/api/v1/articles?id=1" \
  -H "X-API-KEY: aquiTengo-Mysecret-Key"

 
  🔧 Estructura del Proyecto

Este repositorio contiene múltiples componentes organizados en diferentes ramas:

## Rama Principal

main - API REST completa de CRUD de artículos

## Ramas de Ejercicios Técnicos

feature/javascript-exercises - Soluciones de ejercicios de JavaScript ES6+

Números impares entre 0 y 100
Clase para manejo de sueldos de operarios
Clase Alumno con validaciones
Ejercicios de arrays y funciones modernas


feature/sql-queries - Consultas SQL para sistema de empleados

Consultas de filtrado y ordenamiento
Joins entre tablas relacionadas
Funciones de agregación y agrupamiento
Consultas complejas con múltiples condiciones


feature/technical-challenges - Desafíos técnicos adicionales

Algoritmos de búsqueda y filtrado
Manipulación avanzada de arrays
Soluciones optimizadas y buenas prácticas

## Navegación entre Ramas

bash

# Ver todas las ramas disponibles
git branch -a

# Cambiar a una rama específica
git checkout feature/javascript-exercises
git checkout feature/sql-queries
git checkout feature/technical-challenges

# Volver a la rama principal
git checkout main


🔐 Variables de Entorno

Crea un archivo .env:
env
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

🧪 Testing

Ejecutar Tests
bash
# Tests unitarios
pnpm run test

# Tests con coverage
pnpm run test:cov

# Tests end-to-end
pnpm run test:e2e

🎯 Próximas Funcionalidades

 Paginación en listado de artículos
 Autenticación JWT más robusta
 Logs de auditoría de cambios
 Categorías de artículos
 Búsqueda full-text avanzada
 Rate limiting para endpoints
 Métricas y monitoring
 Tests de integración completos