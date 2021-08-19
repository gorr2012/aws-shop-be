import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const apiResponses = {
  _200: (response: { [key: string]: unknown }) => {
      return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
          },
          body: JSON.stringify(response),
      };
  },
  _404: (response: { [key: string]: unknown }) => {
      return {
          statusCode: 404,
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
          },
          body: JSON.stringify({message: `Product with such Id ${response.products} not found`}),
      };
  },
};

export const formatJSONResponse = (response: Record<string, unknown>, status: number) => {
  return apiResponses['_' + status](response);
}
