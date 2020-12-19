import { IRouter, Router } from "express";

import GeoController from '../controller/geo.controller'
class GeoRouter {
    _router: IRouter
    _geoController: GeoController
    constructor(){
        this._router = Router()

        this._geoController = new GeoController()
        
        this.routes()
    }

    private routes(){
        this._router.get('/', this._geoController.index)
    }
}

export default GeoRouter