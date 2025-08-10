export type UserType = {
  name?: string | null
  email?: string | null
  image?: string | null
}

export type Multilang = { uk: string; en: string; ru: string }

export type WineCategory =
  | "red"
  | "white"
  | "rosé"
  | "sparkling"
  | "dessert"
  | "fortified"

export type WineType = {
  _id: string
  name: Multilang
  description: Multilang
  WineCategory: WineCategory
  volume: number
  price: number
  imageUrl?: string
  createdAt: Date
  updatedAt: Date
}
