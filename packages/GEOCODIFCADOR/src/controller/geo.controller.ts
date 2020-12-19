import {Request, Response} from 'express'

class GeoController {

    public index(_req: Request, res: Response) {
        res.status(200).json({
            ok: true,
            message: 'Welcome to my geocodificator',
        })
    }
}

export default GeoController