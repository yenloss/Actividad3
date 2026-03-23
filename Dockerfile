WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Exponer el puerto que usa Express por defecto (3000)
EXPOSE 3000

# Arrancar la aplicación usando el script de Express
CMD ["node", "./bin/www"]
