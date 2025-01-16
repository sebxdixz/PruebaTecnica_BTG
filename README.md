# post-app

Este proyecto consiste en una aplicación web con un backend en Flask (Python) y un frontend en React, utilizando una base de datos MySQL.

## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:
<pre>
post-app/
├── backend/
│  └── app.py       # Archivo principal de Flask que maneja el backend
├── frontend/
│  └── [archivos React] # Archivos del frontend con React
└── README.md      # Documentación del proyecto
</pre>
## Backend (Flask - Python)

El backend de la aplicación está desarrollado utilizando [Flask](https://flask.palletsprojects.com/), un framework web ligero para Python.

### Requisitos

*   Python 3.x
*   Flask
*   MySQL (activado a través de XAMPP)

### Instalación de Dependencias

1.  Crea un entorno virtual (opcional, pero recomendado):

    ```bash
    python -m venv venv
    ```

2.  Activa el entorno virtual:

    *   En Windows:

        ```bash
        venv\Scripts\activate
        ```

    *   En macOS/Linux:

        ```bash
        source venv/bin/activate
        ```

3.  Instala las dependencias del backend:

    ```bash
    pip install -r requirements.txt
    ```

### Ejecutar el Backend

Para iniciar el backend, ejecuta el siguiente comando en el directorio `post-app/backend`:

```bash```
python app.py

# Frontend de post-app (React)

Este directorio contiene el código fuente del frontend de la aplicación *post-app*, desarrollado con React.

## Tecnologías Utilizadas

*   [React](https://react.dev/): Librería de JavaScript para construir interfaces de usuario.
*   [npm](https://www.npmjs.com/): Gestor de paquetes para JavaScript. (o [yarn](https://yarnpkg.com/), si lo usas)

## Instalación

1.  Asegúrate de tener [Node.js](https://nodejs.org/) y npm (o yarn) instalados.
2.  Navega al directorio `post-app/frontend`:

    ```bash
    cd post-app/frontend
    ```

3.  Instala las dependencias:

    ```bash
    npm install  # o yarn install
    ```

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm start  # o yarn start
```
