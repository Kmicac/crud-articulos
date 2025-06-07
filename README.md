<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


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
Despliegue
Soporte

✨ Características

✅ CRUD Completo de artículos
✅ Filtros Avanzados (ID, nombre parcial, estado activo)
✅ Paginación con límites configurables
✅ Health Check para monitoreo de estado
✅ Rate Limiting para prevenir abuso
✅ Validación de Datos con class-validator
✅ Documentación Swagger interactiva
✅ Seguridad con API Key
✅ Base de datos PostgreSQL
✅ Eliminación Lógica (desactivación)
✅ Arquitectura Modular y escalable
✅ Dockerización completa
✅ Logging profesional con NestJS Logger
✅ TypeScript con tipado estricto

🛠 Tecnologías
TecnologíaVersiónPropósitoNestJS^10.0.0Framework principalTypeScript^5.1.3Lenguaje de programaciónPostgreSQL15-alpineBase de datosTypeORM^0.3.17ORM para base de datosSwagger^7.1.0Documentación APIclass-validator^0.14.0Validación de DTOsDocker^24.0.5Containerizaciónpnpm^10.10.0Gestor de paquetes
📋 Requisitos Previos

Node.js >= 20.14.0
pnpm >= 10.10.0
Docker >= 24.0.5
Docker Compose >= 2.0.0

🚀 Instalación y Configuración
Opción 1: Con Docker (Recomendado)
bash# 1. Clonar el repositorio
git clone https://github.com/Kmicac/crud-articulos.git
cd crud-articulos

# 2. Construir y ejecutar con Docker
docker-compose up --build

# ✅ La API estará disponible en: http://localhost:3000
# ✅ Swagger en: http://localhost:3000/api/docs
Opción 2: Instalación Local
bash# 1. Clonar el repositorio
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
httpX-API-KEY: aquiTengo-Mysecret-Key
Base URL
http://localhost:3000/api/v1
📚 Endpoints
🏥 Health Check
Verifica el estado de la API y la base de datos:
httpGET /api/v1/health
Respuesta:
json{
  "status": "ok",
  "timestamp": "2025-06-07T16:51:02.040Z",
  "uptime": 135.333,
  "database": "connected",
  "responseTime": "38ms",
  "version": "0.0.1",
  "environment": "development"
}
📝 Crear Artículo
httpPOST /api/v1/articles
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
📋 Listar Artículos (con Paginación)
httpGET /api/v1/articles
X-API-KEY: aquiTengo-Mysecret-Key
Con filtros y paginación:
httpGET /api/v1/articles?nombre=laptop&activo=true&page=1&limit=5
Parámetros de consulta:

id - Filtrar por ID exacto
nombre - Búsqueda parcial en el nombre
activo - Filtrar por estado (true/false)
page - Número de página (default: 1)
limit - Elementos por página (default: 10)

Respuesta paginada:
json{
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
🔍 Obtener Artículo por ID
httpGET /api/v1/articles/1
X-API-KEY: aquiTengo-Mysecret-Key
✏️ Actualizar Artículo
httpPUT /api/v1/articles/1
Content-Type: application/json
X-API-KEY: aquiTengo-Mysecret-Key

{
  "nombre": "Laptop Dell Inspiron 16",
  "marca": "Dell"
}
Nota: Puedes actualizar uno o varios campos. El campo fechaModificacion se actualiza automáticamente.
🗑️ Desactivar Artículo
httpDELETE /api/v1/articles/1
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

Abre Swagger: http://localhost:3000/api/docs
Haz clic en "Authorize" (🔒)
Ingresa: aquiTengo-Mysecret-Key
Haz clic en "Authorize"
¡Ya puedes probar todos los endpoints!

💡 Ejemplos de Uso
Crear varios artículos
bash# Artículo 1
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
Búsqueda con filtros y paginación
bash# Buscar artículos activos que contengan "phone" (primera página, 5 elementos)
curl -X GET "http://localhost:3000/api/v1/articles?nombre=phone&activo=true&page=1&limit=5" \
  -H "X-API-KEY: aquiTengo-Mysecret-Key"

# Buscar artículo específico por ID
curl -X GET "http://localhost:3000/api/v1/articles?id=1" \
  -H "X-API-KEY: aquiTengo-Mysecret-Key"

# Verificar estado de la API
curl -X GET "http://localhost:3000/api/v1/health" \
  -H "X-API-KEY: aquiTengo-Mysecret-Key"
🔧 Estructura del Proyecto
Este repositorio contiene múltiples componentes organizados en diferentes ramas:
Rama Principal

main - API REST completa de CRUD de artículos

Ramas de Ejercicios Técnicos

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



Navegación entre Ramas
bash# Ver todas las ramas disponibles
git branch -a

# Cambiar a una rama específica
git checkout feature/javascript-exercises
git checkout feature/sql-queries
git checkout feature/technical-challenges

# Volver a la rama principal
git checkout main
🔐 Variables de Entorno
Crea un archivo .env basado en .env.example:
env# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=articles_db

# Aplicación
NODE_ENV=development
PORT=3000
API_KEY=aquiTengo-Mysecret-Key
🧪 Testing
Ejecutar Tests
bash# Tests unitarios
pnpm run test

# Tests con coverage
pnpm run test:cov

# Tests end-to-end
pnpm run test:e2e
🚀 Despliegue
Producción con Docker
bash# 1. Construir imagen de producción
docker build -t crud-articulos-api .

# 2. Ejecutar en producción
docker run -d \
  --name crud-articulos-api \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DB_HOST=tu-db-host \
  -e DB_PASSWORD=tu-password-seguro \
  crud-articulos-api
Variables de Entorno para Producción
envNODE_ENV=production
DB_HOST=tu-host-de-produccion
DB_PORT=5432
DB_USERNAME=tu-usuario
DB_PASSWORD=tu-password-super-seguro
DB_DATABASE=articles_production
API_KEY=tu-api-key-super-segura
PORT=3000