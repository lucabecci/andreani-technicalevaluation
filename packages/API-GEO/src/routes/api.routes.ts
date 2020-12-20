import { IRouter, Router } from "express";

import ApiController from '../controllers/api.controller'
class ApiRouter {
    _router: IRouter
    _apiController: ApiController
    constructor(){
        this._router = Router()

        this._apiController = new ApiController()
        
        this.routes()
    }

    private routes(){
        this._router.get('/', this._apiController.index)
        this._router.post('/', this._apiController.post)
        this._router.get('/:id', this._apiController.getGeoLocalitation)
    }
}

export default ApiRouter