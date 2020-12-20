import * as amqp from "amqplib";
import GeoLocation from "./models/GeoLocation";

export async function connectionBroker(queue: string){
  try {
    const connection = await amqp.connect({
      protocol: 'amqp',
      hostname: 'localhost',
      port: 5672,
      username: 'guest',
      password: 'guest',
      vhost: '/'
    });

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
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify([info])));
    console.log("sending");
  } catch (e) {
    console.log(e);
  }

  channel.close()
}

export async function listenerFinalMessage(
  queue: string,
): Promise<void> {
  const connection = await amqp.connect({
    protocol: 'amqp',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
    vhost: '/'
  });

  const channel = await connection.createChannel();

  await channel.assertQueue(queue);

  await channel.consume(queue, async message => {
    const information = JSON.parse(message!.content.toString())
    const {lat, lon, id} = information[0]
    channel.ackAll()
    await GeoLocation.findOneAndUpdate({location_id: id}, {
      lat,
      lon,
      state: 'TERMINADO',
      location_id: id
    })
    channel.ackAll()
    console.log('updated with the new information')
  })
}
