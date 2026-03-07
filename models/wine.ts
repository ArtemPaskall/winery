import { Schema, model, models } from "mongoose"

const WineSchema = new Schema(
  {
    title: {
      uk: { type: String, required: true },
      en: { type: String, required: true },
      ru: { type: String, required: true },
    },
    description: {
      uk: { type: String, required: true },
      en: { type: String, required: true },
      ru: { type: String, required: true },
    },
    WineCategory: {
      type: String,
      enum: ["red", "white", "rose", "sparkling", "dessert", "fortified"],
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
