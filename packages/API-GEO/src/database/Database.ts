import mongoose, { ConnectOptions, Mongoose } from "mongoose";
import config from "../config/config";
export class Database {
  private _mongoose: Mongoose;
  private _dbconfiguration: ConnectOptions;
  private _db_uri: string;
  
  constructor() {
    this._mongoose = mongoose;
    this._dbconfiguration = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    };
    this._db_uri = config.DB_URI;
  }

  public async getConnection(): Promise<void> {
    let retries = 5;
    while (retries) {
      try {
        await this._mongoose.connect(this._db_uri, this._dbconfiguration);
        console.log("DB is connected");
        break;
      } catch (e) {
        console.log(e);
        retries -= 1;
        console.log("retries:", retries);
        //wait 5 seconds for retry
        await new Promise((res) => setTimeout(res, 5000));
      }
    }
  }
}