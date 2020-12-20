import amqp from 'amqplib'
import axios from 'axios'
import { sendMessage } from './sendMessages'

async function main(){
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

         await channel.assertQueue('initial')

        //receiving messages

        console.log(`receiving messages from ${'initial'}`)
        await channel.consume('initial', async message => {
            let information = JSON.parse(message!.content.toString())
            let {calle, numero, ciudad, codigo_postal, provincia, pais} = information[0]
            calle = calle.replace(/\s/g, '+')
            ciudad = ciudad.replace(/\s/g, '+')
            provincia = provincia.replace(/\s/g, '+')
            pais = pais.replace(/\s/g, '+')

            
            channel.ackAll()
            const url = `https://nominatim.openstreetmap.org/search?street=${calle}+/+${numero}&city=${ciudad}&county=${provincia}&country=${pais}&postalcode=${codigo_postal}&format=json&limit=1`
            // //street=Eduardo+Wilde+&city=Jose+C.+Paz&county=Buenos+Aires&state=Partido+de+Jose+C.+Paz&country=Argentina&postalcode=B1665&format=geojson
            const resp = await axios.get(url)
            const id: string = information[0]._id
            const lat: string = resp.data[0].lat 
            const lon: string = resp.data[0].lon 
            sendMessage(lat, id, lon)
        })
    }
    catch(e){
        console.log(e)
    }
}

main()