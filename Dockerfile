# ESTA LÍNEA ES OBLIGATORIA (Es el cimiento de todo)
FROM node:18-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos solo los archivos de dependencias para instalar primero
COPY package*.json ./

# Instalamos las librerías de Node
RUN npm install

# Copiamos el resto de los archivos (app.js, bin/, public/, etc.)
COPY . .

# El puerto que usa Express por defecto
EXPOSE 3000

# El comando para arrancar la app usando el archivo de configuración de Express
CMD ["node", "./bin/www"]
