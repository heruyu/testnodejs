import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDB({ region: "eu-north-1" });
const dynamo = DynamoDBDocumentClient.from(client);

const getUser = async (event) => {
  const user = {
    TableName: "users",
    KeyConditionExpression: "user_id = :i",
    ExpressionAttributeValues: { ":i": event.pathParameters?.user_id },
    ProjectionExpression: "name, age",
  };
  try {
    const res = await dynamo.query(user).promise();

    return {
      statusCode: 201,
      body: JSON.stringify(res.Items),
    };
  } catch (e) {
    return {
      statusCode: 402,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: `no user with id: ${event.pathParameters?.user_id}`,
      }),
    };
  }
};

export const handler = getUser;
