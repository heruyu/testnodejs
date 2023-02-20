import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDB({region: 'eu-north-1'});
const dynamo = DynamoDBDocumentClient.from(client);

const getUser = async (event) => {
  const path = event.pathParameters.user_id;
  try{
    const user = {
      TableName: 'users',
      KeyConditionExpression: '#db_user_id = :i',
      ExpressionAttributeValues: { ':i': path },
      ExpressionAttributeNames: { "#db_user_id": "user_id"},
      ProjectionExpression: "users_name, age",
      ScanIndexForward: true
    }; 
    
    const res = await dynamo.send(new QueryCommand(user));
    
    return {
        statusCode: 201,
        body: JSON.stringify(res.Items),
      };
      
  }catch(e){ 
    
    return {
        statusCode: 402,
        headers: {"content-type": "application/json"},
        body: JSON.stringify({ error: `no user with id: ${path}`}), 
      };
      
  }
};

export const handler = getUser;
