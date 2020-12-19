import { Channel } from 'amqplib'
import {Request, Response} from 'express'


import { connectionBroker, sendMessage } from '../rabbitmq'
import {checkCamps} from '../helpers/check'
import Location from '../models/Location'
class ApiController {

    public index(_req: Request, res: Response) {
        res.status(200).json({
            ok: true,
            message: 'Hi, this is a api created with Luca Becci, if you need more information of me please use the path /creator',
            usage: 'Use the path(post) location for the usage',
            creator_path: 'http://localhost:4000/creator',
            location_path_post: 'http://localhost:4000/location'
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
        const location = new Location({
            calle,
            numero,
            ciudad,
            codigo_postal,
            provincia,
            pais
        })

        const channel: Channel | undefined = await connectionBroker('test')

        await sendMessage(location, 'test', channel! )

        return res.json({location})
    }
}

export default ApiController