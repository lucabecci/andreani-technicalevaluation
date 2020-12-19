import { Schema, model, Document, SchemaDefinition } from "mongoose";

interface ILocation extends Document {
  calle: string
  numero: number
  ciudad: string
  codigo_postal: number
  provincia: string
  pais: string
}

class LocationSchema {
  private _schemaDefiniton: SchemaDefinition;
  public _locationSchema: Schema;

  constructor() {
    this._schemaDefiniton = {
      calle: {type: String, required: true},
      numero: {type: Number, required: true, default: 0},
      ciudad: {type: String, required: true},
      codigo_postal: {type: Number, required: true, default: 0},
      provincia: {type: String, required: true},
      pais: {type: String, required: true}
    };
    this._locationSchema = new Schema(this._schemaDefiniton, { timestamps: true });
  }
}

const taskSchema = new LocationSchema();

export default model<ILocation>("Location", taskSchema._locationSchema);