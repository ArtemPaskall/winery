// import styles from "./page.module.css";
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Home Page",
}

export default function Home() {
  return (
    <>
      <div> hello world</div>
      <div> hello world</div>
      <div> hello world</div>
      <div> hello world</div>
      <Link href="register">register</Link>
    </>
  )
}
