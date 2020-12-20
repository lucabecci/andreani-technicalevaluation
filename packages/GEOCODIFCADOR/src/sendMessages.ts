import amqp from 'amqplib'

export async function sendMessage(lat: string, id: string, lon: string){
    try{
        const connection = await amqp.connect({
        protocol: 'amqp',
        hostname: 'localhost',
        port: 5672,
        username: 'guest',
        password: 'guest',
        vhost: '/'
        })

        const channel = await connection.createChannel()

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
        console.log(e)
    }
}