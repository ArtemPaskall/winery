import { Schema, model, models } from "mongoose"

const WineSchema = new Schema(
  {
    name: {
      uk: { type: String, required: true },
      en: { type: String, required: true },
      ru: { type: String, required: true },
    },
    description: {
      uk: { type: String, required: true },
      en: { type: String, required: true },
      ru: { type: String, required: true },
    },
    wineType: {
      type: String,
      enum: ["red", "white", "rosé", "sparkling", "dessert", "fortified"],
      required: true,
    },
    volume: { type: Number, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

export default models.Wine || model("Wine", WineSchema)
