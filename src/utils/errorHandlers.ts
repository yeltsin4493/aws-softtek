import * as yup from "yup";
const headers = { "content-type": "application/json" };

export class HttpError extends Error {
  constructor(public statusCode: number, body: Record<string, unknown>) {
    super(JSON.stringify(body));
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof yup.ValidationError) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ errors: error.errors }),
    };
  }

  if (error instanceof SyntaxError) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: `invalid request body format: "${error.message}"` }),
    };
  }

  if (error instanceof HttpError) {
    return {
      statusCode: error.statusCode,
      headers,
      body: error.message,
    };
  }
  throw error;
};
