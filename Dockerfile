# Usa una imagen ligera de Python
FROM python:3.9-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu repositorio al contenedor
COPY . .

# Si tienes un archivo requirements.txt, descomenta la siguiente línea:
# RUN pip install --no-cache-dir -r requirements.txt

# Comando para ejecutar tu aplicación (cambia 'main.py' por tu archivo principal)
CMD ["python", "main.py"]
