import { Channel } from 'amqplib'
import {Request, Response} from 'express'


import { connectionBroker, sendMessage } from '../rabbitmq'
import {checkCamps} from '../helpers/check'
import Location, {ILocation} from '../models/Location'
import GeoLocation, { IGeoLocation } from '../models/GeoLocation'
import config from '../config/config'
class ApiController {

    public index(_req: Request, res: Response) {
        res.status(200).json({
            mensaje: 'Hola, esta es una API RESTUFL creada por Luca Becci para la prueba tecnica de andreani 2020.',
            linkedin: 'https://www.linkedin.com/in/luca-becci-b8044b198/',
            github: 'https://github.com/lucabecci',
            tecnologias: ['Typescript', 'Node.JS', 'Express', 'MongoDB', 'Docker', 'RabbitMQ', 'Mongoose', 'Lerna', 'Morgan'],
            uso: 'Use el endpoint "geolocalizar" mediante POST para poder enviar la informacion al servicio GEOCODIFICADOR, luego de eso usted recibira un ID como respuesta. Cuando usted tenga ese ID debera utilizarlo en el endpoint "geocodificar/(su id)" para asi obtener la respuesta final con la informacion del id, la latitud, la longitud y el estado.. ',
            endpoint_post: 'http://localhost:4000/geolocalizar',
            endpoint_get: 'http://localhost:4000/geocodificar/id'
        })
    }

    public async post(req: Request, res: Response): Promise<Response>{
        const {calle, numero, ciudad, codigo_postal, provincia, pais} = req.body

        const checked = checkCamps(
            calle, numero, ciudad, 
            codigo_postal, provincia, pais
            )
        if(checked){
            return res.status(400).json({
                ok: false,
                message: 'Please send all camps'
            })
        }
        const location: ILocation = new Location({
            calle,
            numero,
            ciudad,
            codigo_postal,
            provincia,
            pais
        })

        const geoLocation: IGeoLocation = new GeoLocation({
            location_id: location._id
        })
        await geoLocation.save()
        await location.save()

        const channel: Channel | undefined = await connectionBroker(config.AMQP_INITIAL)

        await sendMessage(location, config.AMQP_INITIAL, channel! )

        return res.json(location._id)
    }

    public async getGeoLocalitation(req: Request, res: Response): Promise<Response>{
        const locationID = req.params.id;
        try{
            const location = await GeoLocation.findOne({location_id: locationID})
            return res.status(202).json({
                id: location?.location_id,
                latitud: location?.lat,
                longitud: location?.lon,
                estado: location?.state
            })
        }
        catch(e){
            return res.status(400).json({
                ok: false,
                message: 'ID not found, please send a valid ID'
            })
        }
    }
}

export default ApiController