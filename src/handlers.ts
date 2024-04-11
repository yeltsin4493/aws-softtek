import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import axios from "axios";
import AWS from "aws-sdk";
import { v4 } from "uuid";
import { handleError } from "./utils/errorHandlers";
import { schema } from "./schemas/schema";

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = "DatabaseTable";

// Definir una interfaz para el mapeo de nombres de atributos
interface AttributeMapping {
  [key: string]: string;
}

// Función para realizar solicitudes a la API de Star Wars
export const getStarWarsData: APIGatewayProxyHandler = async (event, _context) => {
  try {
    // Obtener el ID del personaje de la solicitud HTTP
    const characterId = event.pathParameters?.id as string;

    if (!characterId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Se requiere el parámetro "id"' }),
      };
    }

    const apiUrl = `https://swapi.py4e.com/api/people/${characterId}`;

    // Hacer una solicitud GET a la URL de la API de Star Wars para obtener datos
    const response = await axios.get(apiUrl);

    // Extraer los datos de la respuesta
    const starWarsData = response.data;

    // Definir el mapeo de nombres de atributos
    const attributeMapping: AttributeMapping = {
      name: "nombre",
      height: "altura",
      mass: "masa",
      hair_color: "color_del_cabello",
      skin_color: "color_de_piel",
      eye_color: "color_de_ojos",
      birth_year: "año_de_nacimiento",
      gender: "género",
      homeworld: "planeta_de_origen",
      films: "películas",
      species: "especies",
      vehicles: "vehículos",
      starships: "naves_estelares",
      created: "creado",
      edited: "editado",
      url: "url",
    };

    // Transformar los nombres de los atributos según el mapeo
    const transformedData = Object.keys(starWarsData).reduce((acc: any, key) => {
      const translatedKey = attributeMapping[key] || key;
      acc[translatedKey] = starWarsData[key];
      return acc;
    }, {});

    // Devolver la respuesta al cliente
    return {
      statusCode: 200,
      body: JSON.stringify(transformedData),
    };
  } catch (error) {
    return handleError(error);
  }
};

export const createStarWarsCharacter: APIGatewayProxyHandler = async (event, _context) => {
  try {
    // Analizar el Cuerpo de la Solicitud:
    const requestBody = JSON.parse(event.body as string);

    // Preparar Datos con ID
    const body = {
      ...requestBody,
      id: v4(),
    };

    // Validar Datos (asumiendo que 'schema' está definido en otro lugar):
    await schema.validate(body, { abortEarly: false });

    // Escribir Datos a DynamoDB
    await docClient
      .put({
        TableName: tableName,
        Item: body,
      })
      .promise();

    // Devolver Respuesta Exitosa
    return {
      statusCode: 201,
      body: JSON.stringify(body),
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getStarWarsCharacters: APIGatewayProxyHandler = async (event, _context) => {
  try {
    // Realiza una consulta a la tabla DynamoDB para obtener todos los personajes de Star Wars
    const result = await docClient.scan({ TableName: tableName }).promise();

    // Devuelve los datos obtenidos de la tabla DynamoDB
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    return handleError(error);
  }
};
