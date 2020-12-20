import amqp from 'amqplib'

export async function sendMessage(lat: string, id: string, lon: string){
    try{
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

        const channel = await connection!.createChannel()

         await channel.assertQueue('final')

        //sending messages
        const info = {
            lat: lat,
            lon: lon,
            id: id
        }
        await channel.sendToQueue('final', Buffer.from(JSON.stringify([info])))
        console.log('sending final message')
    }
    catch(e){
        console.log('not connected of rabbitMQ')
    }
}