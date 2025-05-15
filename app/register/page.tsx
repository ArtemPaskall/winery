import st from "./style.module.scss"
import { signIn, signOut, auth } from "@/auth"

export default async function Register() {
  const session = await auth()
  console.log(session)

  return (
    <div className={st["register-block"]}>
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
      <div>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button type="submit">Signin OUT Google</button>
        </form>
      </div>
    </div>
  )
}
