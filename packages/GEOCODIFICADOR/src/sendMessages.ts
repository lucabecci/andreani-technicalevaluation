import amqp from "amqplib";
import config from "./config/config";

export async function sendMessage(lat: string, id: string, lon: string) {
  try {
    let connection: amqp.Connection;
    let retries = 5;
    while (retries) {
      try {
        connection = await amqp.connect(config.AMQP_URI);
        console.log(`rabbitMQ for send initial messages is connected.`);
        break;
      } catch (e) {
        console.log(
          `rabbitMQ for send initial messages is not connected. Retries left: ${retries}`
        );
        retries -= 1;
        //wait 5 seconds
        await new Promise((res) => setTimeout(res, 5000));
      }
    }

    const channel = await connection!.createChannel();

    await channel.assertQueue(config.AMQP_FINAL);

    //sending messages
    const info = {
      lat: lat,
      lon: lon,
      id: id,
    };
    await channel.sendToQueue("final", Buffer.from(JSON.stringify([info])));
  } catch (e) {
    console.log("not connected of rabbitMQ");
  }
}
