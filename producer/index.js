import { Kafka } from "kafkajs";
import express from "express";
import router from "./routes.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(router);

app.listen(3333);
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
  retry: { initialRetryTime: 300, retries: 10 },
});
const producer = kafka.producer();

async function kafkaConnect() {
  try {
    await producer.connect();
  } catch (err) {
    console.log("NÃO FOI POSSÍVEL CONECTAR AO KAFKA!!");
  }
}

export async function sendMessage(message) {
  try {
    await producer.send({
      topic: "test-topic",
      messages: [{ value: message }],
    });
    console.log("MESSAGE WROTE SUCCESSFULLY TO STREAM!!");
  } catch (err) {
    console.log("SOMETHING WENT WRONG :(");
  }
}

async function createTopicIfNotExists() {
  const admin = kafka.admin();
  const topics = await admin.listTopics();
  if (topics.length <= 0) {
    try {
      console.log("CREATING TOPICS..");
      await admin.createTopics({
        timeout: 300,
        topics: [{ topic: "test-topic" }],
      });
      console.log("TOPICS CREATED..");
    } catch (err) {
      console.log(`Message: ${err.message}, erro: ${err.error}`);
    }
  } else {
    return true;
  }
}

function main() {
  kafkaConnect();
  createTopicIfNotExists();
}

main();
export default { producer, sendMessage, app };
