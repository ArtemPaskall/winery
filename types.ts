export type UserType = {
  name?: string | null
  email?: string | null
  image?: string | null
}

export type WineType = {
  _id: string
  name: { uk: string; ru: string; en: string }
  description: string
  wineType: "red" | "white" | "rosé" | "sparkling" | "dessert" | "fortified"
  volume: number
  price: number
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}
