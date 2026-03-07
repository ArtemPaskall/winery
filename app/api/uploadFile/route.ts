import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const uploadData = new FormData()
  uploadData.append("file", file)
  uploadData.append("upload_preset", "ml_winery")

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dcnty3v6u/image/upload",
    { method: "POST", body: uploadData }
  )

  const data = await res.json()

  return NextResponse.json({ url: data.secure_url })
}
