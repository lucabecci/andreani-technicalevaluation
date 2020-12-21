import express, { Application } from "express";
import morgan from "morgan";
import config, { IConfig } from "./config/config";
import { Database } from "./database/Database";
import { listenerFinalMessage } from "./rabbitmq";
import ApiRouter from "./routes/api.routes";

class App {
  private _app: Application;
  private _database: Database;
  private _apiRouter: ApiRouter;
  private _config: IConfig;
  constructor() {
    this._app = express();
    this._database = new Database();
    this._apiRouter = new ApiRouter();
    this._config = config;
    this.initRabbit();
    this.initDatabase();
    this.initConfig();
    this.initRoutes();
  }
  private async initRabbit() {
    await listenerFinalMessage(this._config.AMQP_FINAL, this._config.AMQP_URI);
  }
  private initDatabase() {
    this._database.getConnection();
  }
  public initConfig() {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: false }));
    this._app.use(morgan(this._config.MORGAN_STATE));
  }
  public initRoutes() {
    this._app.use("/", this._apiRouter._router);
  }

  public run(): void {
    this._app.listen(this._config.PORT, () => {
      console.log("Server on port =>", this._config.PORT);
    });
  }
}

export default App;
