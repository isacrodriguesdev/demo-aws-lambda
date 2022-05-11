'use strict'
const AWS = require("aws-sdk")
AWS.config.update({ region: 'us-east-1' });

module.exports.deletePhrase = async (context) => {

  const ddb = new AWS.DynamoDB.DocumentClient();

  await ddb.delete({
    TableName: "phrases",
    Key: {
      id: context.id,
    }
  }).promise()

  return {
    statusCode: 200,
    body: {}
  }
}
