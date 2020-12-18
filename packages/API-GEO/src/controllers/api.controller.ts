import {Request, Response} from 'express'

class ApiController {
    public index(_req: Request, res: Response) {
        res.status(200).json('hello world')
    }
}

export default ApiController