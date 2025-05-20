import { Metadata } from "next"
import Register from "./Register/Register"

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
