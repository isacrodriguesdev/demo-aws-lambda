'use strict'
const AWS = require("aws-sdk")
AWS.config.update({ region: 'us-east-1' });

module.exports.listPhrases = async (context) => {

  const ddb = new AWS.DynamoDB.DocumentClient();

  const result = await ddb.scan({
    TableName: "phrases",
    FilterExpression : 'userId = :_userId',
    ExpressionAttributeValues : {':_userId' : context.userId}
  }).promise()

  return {
    statusCode: 200,
    body: result.Items
  }
}
