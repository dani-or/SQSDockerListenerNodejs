'use strict'

const QUEUE_URL = "https://queue.amazonaws.com/789027019283/sqs-backout-retry-transactions-qa";

module.exports = {
    start: start
};

const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const sqs = new AWS.SQS();

console.log("Iniciando...");
start();

async function start() {
    try {        
        await retriveMessages();
    } catch (error) {
        console.log(error);
    }
}

async function retriveMessages(){
    var params = {
        QueueUrl: QUEUE_URL, 
        MaxNumberOfMessages: '10'
      };
    try {
        console.log("entró-----------------------", new Date());
        let messages =  await sqs.receiveMessage(params).promise();
        console.log(messages);    
    } catch (error) {
        console.log(error);   
    }
    console.log("Esperando---------------------------------");
    await timeout(15000);
    await retriveMessages();
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}