import * as amqp from "amqplib";
import GeoLocation from "./models/GeoLocation";

export async function connectionBroker(queue: string){
  try {
    let connection: amqp.Connection;
    let retries = 5;
    while(retries){
      try{
        connection = await amqp.connect('amqp://rabbitmq');
        console.log(`rabbitMQ for send initial messages is connected. Retries left: ${retries}`)
        break
      }
      catch(e){
        console.log('rabbitMQ for send initial messages is not connected')
        retries -= 1
        //wait 5 seconds
        await new Promise((res) => setTimeout(res, 5000));
      }
    }
    const channel = await connection!.createChannel();

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
    console.log('not connected of rabbitMQ')
  }

  channel.close()
}

export async function listenerFinalMessage(
  queue: string,
): Promise<void> {
  let connection: amqp.Connection;
  let retries = 5;
  while(retries){
    try{
      connection = await amqp.connect('amqp://rabbitmq');
      console.log(`rabbitMQ for final messages is connected. Retries left: ${retries}`)
      break
    }
    catch(e){
      console.log('rabbitMQ for final messages is not connected')
      retries -= 1
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  const channel = await connection!.createChannel();

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
