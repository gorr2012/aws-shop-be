import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/postProduct.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true
      }
    }
  ]
}
