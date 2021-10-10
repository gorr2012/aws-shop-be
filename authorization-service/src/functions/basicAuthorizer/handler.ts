import 'source-map-support/register';

export const basicAuthorizer = async (event, _context, callback) => {
  console.log(event);

  if (event['type'] !== 'TOKEN') callback('Unauthorized');

  const authToken = event.authorizationToken;
  const encodedCreds = authToken.split(' ')[1];
  const buff = Buffer.from(encodedCreds, 'base64');
  const plainCredsv = buff.toString('utf-8').split(':');
  const [ userName, userPass ] = plainCredsv;

  try {
    userPass && userPass && callback('Unauthorized');

    const storedUserPass = process.env[userName];
    const effect = !storedUserPass || storedUserPass !== userPass ? 'Deny' : 'Allow';
    const policy = generatePolicy(encodedCreds, event.methodArn, effect);
    callback(null, policy)
  } catch (error) {
    callback('Unauthorized: ', error.message);
  }
}

const generatePolicy = (principalId: string, resource: string, effect = 'Allow') => {  
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  }
}
