import { NextResponse } from "next/server"
import Wine from "@/models/wine"
import connectDB from "@/lib/mongoDB"

export async function POST(req: Request) {
  try {
    await connectDB()

    const data = await req.json()

    const newWine = await Wine.create(data)

    return NextResponse.json(newWine, { status: 201 })
  } catch (error) {
    console.error("DB error:", error)

    return NextResponse.json(
      {
        // Якщо error — обʼєкт Error, повертаємо його повідомлення, інакше загальний текст
        message:
          error instanceof Error ? error.message : "Помилка при створенні вина",
      },
      { status: 500 }
    )
  }
}
