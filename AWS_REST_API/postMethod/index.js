"use strict";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { v4 } from "uuid";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .min(3),
  age: Joi.number().min(10).max(100).required(),
});

const client = new DynamoDB({});
const dynamo = DynamoDBDocument.from(client);
const postUser = async (event) => {
  const body = JSON.parse(event.body);
  try {
    const id = v4();
    var user = {
      TableName: "users",
      Item: {
        users_name: body.name,
        age: body.age,
        user_id: id,
      },
    };
    schema.validateAsync(user.Item, { abortEarly: false }).catch((err) => {
      return {
        statusCode: 422,
        body: JSON.stringify({
          errors: err.errors,
        }),
      };
    });
    await dynamo.put(user);
    return {
      statusCode: 201,
      body: JSON.stringify(`Your id: ${id}`),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: `Could not create user, Error: ${error.message}`,
      }),
    };
  }
};

export const handler = postUser;
