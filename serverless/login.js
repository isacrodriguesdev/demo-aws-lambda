'use strict'
const AWS = require("aws-sdk")
AWS.config.update({ region: 'us-east-1' });

module.exports.login = async (context) => {

  const ddb = new AWS.DynamoDB.DocumentClient();

  const result = await ddb.scan({
    TableName: "users",
    Limit: 1,
    FilterExpression: 'username = :_username',
    ExpressionAttributeValues: { ':_username': context.username }
  }).promise()

  const user = result.Items[0]

  if (!user) {
    return {
      statusCode: 401,
      body: { error: "Not authorized" }
    }
  }

  if (user.password != context.password) {
    return {
      statusCode: 400,
      body: { error: "Incorrect password!" }
    }
  }

  return {
    statusCode: 200,
    body: result.Items[0]
  }
}
