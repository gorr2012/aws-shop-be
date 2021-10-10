import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/putProduct.main`,
  events: [
    {
      http: {
        method: 'put',
        path: 'products/{productId}',
        cors: true
      }
    }
  ]
}
