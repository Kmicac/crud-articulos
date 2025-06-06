FROM node:20-alpine

# Instalar pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies)
RUN pnpm install

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN pnpm run build

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["pnpm", "run", "start:prod"]