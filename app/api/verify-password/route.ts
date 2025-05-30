import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { password } = await req.json()
  const correctPassword = process.env.SECRET_PASSWORD

  if (password === correctPassword) {
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json(
      { success: false, message: "Пароль не вірний" },
      { status: 401 }
    )
  }
}
