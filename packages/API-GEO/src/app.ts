import express, { Application } from "express";

class App {
    _app: Application
    constructor(){
        this._app = express()
    }

    public run(): void {
        this._app.listen(4000, () => {
            console.log('Server on port =>', 4000)
        })
    }
}


export default App