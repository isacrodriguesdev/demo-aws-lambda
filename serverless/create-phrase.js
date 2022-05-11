'use strict'
const AWS = require("aws-sdk")
AWS.config.update({ region: 'us-east-1' });

module.exports.createPhrase = async (context) => {

  const ddb = new AWS.DynamoDB.DocumentClient();

 const result = await ddb.scan({
    TableName: "phrases",
    Limite: 1,
    FilterExpression : 'phrase = :_phrase',
    ExpressionAttributeValues : {':_phrase' : context.phrase}
  }).promise()

  if(result && result.Items.length > 0) {
    return {
      statusCode: 400,
      body: {error: "This sentence already exists"}
    }
  }
  
  const data = {
    id: Math.round(Date.now() + Math.random() * 1000),
    phrase: context.phrase,
    userId: context.userId
  }

  await ddb.put({
    TableName: "phrases",
    Item: data
  }).promise()

  return {
    statusCode: 200,
    body: data
  }
}
