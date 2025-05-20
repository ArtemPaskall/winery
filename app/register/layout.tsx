import { Metadata } from "next"
import Register from "../register/page"

export const metadata: Metadata = {
  title: "Registration Page",
}

export default function RegistrationPage() {
  return (
    <>
      <Register />
    </>
  )
}
