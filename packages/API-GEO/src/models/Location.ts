import { Schema, model, Document, SchemaDefinition } from "mongoose";

interface ILocation extends Document {
  title: string;
  descriptiton: string;
  priority: number;
}

class LocationSchema {
  private _schemaDefiniton: SchemaDefinition;
  public _locationSchema: Schema;

  constructor() {
    this._schemaDefiniton = {
      title: { type: String, required: true, length: 20 },
      description: { type: String, required: true, length: 80 },
      priority: { type: Number, required: true, default: 3 },
    };
    this._locationSchema = new Schema(this._schemaDefiniton, { timestamps: true });
  }
}

const taskSchema = new LocationSchema();

export default model<ILocation>("Location", taskSchema._locationSchema);