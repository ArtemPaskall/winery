import { signIn, signOut, auth } from "@/auth"

export default async function SignIn() {
  const session = await auth()
  console.log(session)

  return (
    <>
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
    </>
  )
}
