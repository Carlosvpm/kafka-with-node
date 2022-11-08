import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group" });

await consumer.connect();
await consumer.subscribe({ topic: "test-topic" });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log(`MENSAGEM RECEBIDA: ${message.value.toString()}`);
  },
});
