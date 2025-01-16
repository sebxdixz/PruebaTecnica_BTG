Estructura del Proyecto
La estructura del proyecto está organizada de la siguiente manera:

bash
Copiar
Editar
post-app/
├── backend/
│   └── app.py            # Archivo principal de Flask que maneja el backend
├── frontend/
│   └── [archivos React]  # Archivos del frontend con React
├── README.md             # Documentación del proyecto
Backend (Flask - Python)
El backend de la aplicación está desarrollado utilizando Flask, un framework web ligero para Python. Para iniciar el backend, ejecuta el siguiente comando en el directorio post-app/backend:

bash
Copiar
Editar
python app.py
Este comando activará el servidor Flask, que comenzará a recibir peticiones desde el frontend y interactuar con la base de datos MySQL.

Requisitos
Python 3.x
Flask
MySQL (activado a través de XAMPP)
Instalación de Dependencias
Crea un entorno virtual (opcional, pero recomendado):
bash
Copiar
Editar
python -m venv venv
Activa el entorno virtual:
En Windows: venv\Scripts\activate
En macOS/Linux: source venv/bin/activate
Instala las dependencias del backend:
bash
Copiar
Editar
pip install -r requirements.txt
Frontend (React)
El frontend está construido con React. Para iniciar el servidor de desarrollo de React, navega al directorio post-app/frontend y ejecuta el siguiente comando:

bash
Copiar
Editar
npm start
Esto abrirá la aplicación en tu navegador en http://localhost:3000, donde podrás ver la interfaz de usuario interactuar con el backend.

Requisitos
Node.js
npm (gestor de paquetes de Node)
Instalación de Dependencias
Navega al directorio post-app/frontend.
Instala las dependencias del frontend:
bash
Copiar
Editar
npm install
Base de Datos (MySQL)
La base de datos utilizada en este proyecto es MySQL. Para activarla, sigue los pasos a continuación:

Abre XAMPP y activa el servidor MySQL.
Conéctate a MySQL utilizando phpMyAdmin o un cliente MySQL de tu preferencia.
Crea las bases de datos y tablas necesarias que el backend utilizará.
Instrucciones Generales
Activa MySQL en XAMPP.
En el directorio post-app/backend, ejecuta python app.py para iniciar el backend.
En el directorio post-app/frontend, ejecuta npm start para iniciar el frontend.
La aplicación estará disponible en http://localhost:3000 para interactuar con el frontend y backend.
