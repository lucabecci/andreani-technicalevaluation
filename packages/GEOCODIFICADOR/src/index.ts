import amqp from "amqplib";
import axios from "axios";
import config from "./config/config";
import { sendMessage } from "./sendMessages";

async function main() {
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

    await channel.assertQueue(config.AMQP_INITIAL);

    //receiving messages

    console.log(`receiving messages from ${"initial"}`);
    await channel.consume("initial", async (message) => {
      let information = JSON.parse(message!.content.toString());
      let {
        calle,
        numero,
        ciudad,
        codigo_postal,
        provincia,
        pais,
      } = information[0];
      calle = calle.replace(/\s/g, "+");
      ciudad = ciudad.replace(/\s/g, "+");
      provincia = provincia.replace(/\s/g, "+");
      pais = pais.replace(/\s/g, "+");

      channel.ackAll();
      const url = `https://nominatim.openstreetmap.org/search?street=${calle}+/+${numero}&city=${ciudad}&county=${provincia}&country=${pais}&postalcode=${codigo_postal}&format=json&limit=1`;
      const resp = await axios.get(url);
      const id: string = information[0]._id;
      const lat: string = resp.data[0].lat;
      const lon: string = resp.data[0].lon;
      sendMessage(lat, id, lon);
    });
  } catch (e) {
    console.log("RabbitMQ is not conected...");
  }
}

main();
