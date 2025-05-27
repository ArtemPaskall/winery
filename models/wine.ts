import { Schema, models, model } from "mongoose"
import { WineType } from "@/types"

const WineSchema = new Schema<WineType>(
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

export default models.Wine || model<WineType>("Wine", WineSchema)
