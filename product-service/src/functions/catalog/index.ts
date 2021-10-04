import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.catalogBatchProcess`,
  events:[
    {
      sqs: {
        batchSize: 6,
        arn: {
          "Fn::GetAtt" : [ "MySQS", "Arn" ]
        }
      }
    }
  ]
}
