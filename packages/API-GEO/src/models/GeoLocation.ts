import { Schema, model, Document, SchemaDefinition } from "mongoose";

export interface IGeoLocation extends Document {
  _id?: string
  lat: string
  lon: string
  state: string
  location_id: string
}

class GeoLocationSchema {
  private _schemaDefiniton: SchemaDefinition;
  public _geoLocationSchema: Schema;

  constructor() {
    this._schemaDefiniton = {
      lat: {type: Number, required: true, default: 0},
      lon: {type: Number, required: true, default: 0},
      state: {type: String, required: true, default: 'PROCESANDO'},
      location_id: {type: String, required: true}
    };
    this._geoLocationSchema = new Schema(this._schemaDefiniton, { timestamps: true });
  }
}

const geoLocationSchema = new GeoLocationSchema();

export default model<IGeoLocation>("GeoLocation", geoLocationSchema._geoLocationSchema);