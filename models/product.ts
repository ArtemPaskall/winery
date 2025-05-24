import { Schema, Document, models, model } from "mongoose"

export interface IWine extends Document {
  name: string
  description: string
  price: number
  vintage: number // рік виробництва
  alcoholContent: number // у відсотках
  wineType: "red" | "white" | "rosé" | "sparkling" | "dessert" | "fortified"
  country: string
  volume: number // мл
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

const WineSchema = new Schema<IWine>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    vintage: { type: Number, required: true },
    alcoholContent: { type: Number, required: true },
    wineType: {
      type: String,
      enum: ["red", "white", "rosé", "sparkling", "dessert", "fortified"],
      required: true,
    },
    country: { type: String, required: true },
    volume: { type: Number, required: true }, // наприклад 750 мл
    imageUrl: { type: String, required: false },
  },
  {
    timestamps: true, // автоматично додає createdAt і updatedAt
  }
)

export default models.Wine || model<IWine>("Wine", WineSchema)
