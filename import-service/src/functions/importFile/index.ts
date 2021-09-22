import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: 'gorr2012-uploads',
        event: 's3:ObjectCreated:*',
        rules: [{ prefix: 'uploads/' }],
        existing: true
      }
    }
  ]
}
