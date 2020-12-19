import express, { Application } from "express";
import morgan from "morgan";
import RabbitMQ, { IRabbitMQ } from "./rabbitmq";
import ApiRouter from "./routes/api.routes";

class App {
    private _app: Application
    private _apiRouter: ApiRouter 
    public _rabbitMQ: IRabbitMQ
    constructor(){
        this._app = express()
        this._apiRouter = new ApiRouter
        this._rabbitMQ = new RabbitMQ

        this.initRabbit()
        this.initRoutes()
    }
    public initRabbit(){
        this._rabbitMQ.connectionBroker('test')
    }

    public initConfig(){
        this._app.use(express.json())
        this._app.use(express.urlencoded({extended: false}))
        this._app.use(morgan('dev'))
    }
    public initRoutes(){
        this._app.use('/', this._apiRouter._router)
    }

    public run(): void {
        this._app.listen(4000, () => {
            console.log('Server on port =>', 4000)
        })
    }
}


export default App