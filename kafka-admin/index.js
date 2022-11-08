import { Kafka } from "kafkajs";
const admin = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
}).admin();

await admin.connect();

async function createTopicIfNotExists() {
  const topics = await admin.listTopics();
  if (topics.length <= 0) {
    try {
      await admin.createTopics({
        timeout: 300,
        topics: [{ topic: "test-topic" }],
      });
      console.log(`TOPICS: ${await admin.listTopics()}`);
    } catch (err) {
      console.log(`Message: ${err.message}, erro: ${err.error}`);
    }
  } else {
    console.log("Topics exists..");
  }
}

createTopicIfNotExists();
