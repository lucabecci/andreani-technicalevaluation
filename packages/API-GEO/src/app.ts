
import express, { Application } from "express";
import morgan from "morgan";
import { Database } from "./database/Database";
import { listenerFinalMessage } from "./rabbitmq";
import ApiRouter from "./routes/api.routes";

class App {
    private _app: Application
    private _database: Database
    private _apiRouter: ApiRouter 
    constructor(){
        this._app = express()
        this._database = new Database('mongodb://localhost/andreani')
        this._apiRouter = new ApiRouter

        this.initRabbit()
        this.initDatabase()
        this.initConfig()
        this.initRoutes()
    }
    private async initRabbit(){
        await listenerFinalMessage('final')
    }
    private initDatabase(){
        this._database.getConnection()
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