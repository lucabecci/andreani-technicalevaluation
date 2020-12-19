import * as amqp from "amqplib";

export async function connectionBroker(queue: string){
  try {
    const connection = await amqp.connect("amqp://localhost:5672");

    const channel = await connection.createChannel();

    await channel.assertQueue(queue);

    return channel

  } catch (e) {
    console.log("error");
    return e
  }
}

export async function sendMessage(
  info: any,
  queue: string,
  channel: amqp.Channel
): Promise<void> {
  try {
    await channel.sendToQueue(queue, Buffer.from([info]));
    console.log("sending");
  } catch (e) {
    console.log(e);
  }
}

