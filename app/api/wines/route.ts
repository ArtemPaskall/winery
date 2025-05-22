import { NextResponse } from "next/server"
import Wine from "@/models/product" // твоя модель
import connectDB from "@/lib/mongoDB" // див. нижче

export async function POST(req: Request) {
  try {
    await connectDB() // підключення до бази

    const data = await req.json()

    const newWine = await Wine.create(data)

    return NextResponse.json(newWine, { status: 201 })
  } catch (error) {
    console.error("DB error:", error)
    return NextResponse.json(
      { message: "Помилка при створенні вина" },
      { status: 500 }
    )
  }
}
