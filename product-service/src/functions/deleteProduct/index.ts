import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/deleteProduct.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'products/{productId}',
        cors: true
      }
    }
  ]
}
