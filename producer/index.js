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

async function kafkaConnect() {
  try {
    await producer.connect();
  } catch (err) {
    console.log("NÃO FOI POSSÍVEL CONECTAR AO KAFKA!");
  }
}

const producer = kafka.producer();
kafkaConnect();

export async function sendMessage(message) {
  try {
    await producer.send({
      topic: "test-topic",
      messages: [{ value: message }],
    });
    console.log("message wrote successfully to stream!!");
  } catch (err) {
    console.log("something went wrong  :(");
  }
}
export default { producer, sendMessage, app };
