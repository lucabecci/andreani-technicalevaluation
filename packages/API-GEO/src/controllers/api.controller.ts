import {Request, Response} from 'express'
import {checkCamps} from '../helpers/check'

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

    public post(req: Request, res: Response): Response{
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
        
        return res.send('hello')
    }
}

export default ApiController