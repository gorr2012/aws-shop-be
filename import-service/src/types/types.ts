interface IHeaders {
  [key: string]: string
}

export const headers: IHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*'
}

export interface IResponse {
  statusCode: number,
  headers: IHeaders,
  body: string
}


export const BUCKET = 'gorr2012-uploads';
