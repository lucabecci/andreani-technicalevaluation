import {Request, Response} from 'express'

class GeoController {

    public index(_req: Request, res: Response) {
        res.status(200).json({
            ok: true,
            message: 'Hi, this is a api created with Luca Becci, if you need more information of me please use the path /creator',
            usage: 'Use the path(post) location for the usage',
            creator_path: 'http://localhost:4000/creator',
            location_path_post: 'http://localhost:4000/location'
        })
    }
}

export default GeoController