# API de Star Wars

Esta es una API construida en AWS Lambda utilizando el Serverless Framework y TypeScript. Proporciona acceso a datos sobre personajes de Star Wars obtenidos de la API pública [SWAPI](https://swapi.py4e.com/), así como la capacidad de crear nuevos personajes y recuperar todos los personajes almacenados en una tabla de DynamoDB.

## Funciones

### Obtener datos de un personaje de Star Wars

Endpoint: `GET /starwars/{id}`

Este endpoint recupera datos sobre un personaje de Star Wars específico identificado por su ID.

### Crear un nuevo personaje de Star Wars

Endpoint: `POST /starwars`

Este endpoint crea un nuevo personaje de Star Wars. Se espera un cuerpo de solicitud JSON con los siguientes campos: `name`, `species`, y `homeworld`.

### Obtener todos los personajes de Star Wars

Endpoint: `GET /starwars`

Este endpoint recupera todos los personajes de Star Wars almacenados en la tabla DynamoDB.

## Configuración

### Serverless Framework

El proyecto utiliza el Serverless Framework para gestionar la infraestructura en AWS. El archivo `serverless.yml` contiene la configuración de las funciones Lambda, así como la definición de la tabla DynamoDB.

### Manejo de Errores

La lógica de manejo de errores se encuentra en el archivo `utils/errorHandlers.ts`. Aquí se define una función `handleError` que se utiliza en cada función Lambda para capturar y devolver errores adecuadamente.

### Validación de Datos

Para la creación de un nuevo personaje de Star Wars, se utiliza una validación de datos basada en un esquema definido en otro lugar del proyecto.
