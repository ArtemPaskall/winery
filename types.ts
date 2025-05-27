export type UserType = {
  name?: string | null
  email?: string | null
  image?: string | null
}

export type WineType = {
  _id: string
  name: string
  description: string
  price: number
  vintage: number // рік виробництва
  alcoholContent: number // у відсотках
  wineType: "red" | "white" | "rosé" | "sparkling" | "dessert" | "fortified"
  country: string
  volume: number
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}
