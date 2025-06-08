import Image from "next/image"
import Link from "next/link"
import "./styles/globals.scss"

export default function Error() {
  return (
    <div className="not-found-wrapp">
      <Link href={"/"} className="home-page-text">
        На головну сторінку
      </Link>
      <div className="cloud-wrapp">
        <h1 className="not-found-text">
          Сторінку не <br /> знайдено{" "}
        </h1>
        <Image
          src={"/cloud.png"}
          alt="comment image"
          width={300}
          height={200}
          className="cloud-img"
        />
      </div>
      <Image
        src={"/gru.png"}
        alt="man image"
        width={300}
        height={200}
        className="not-found-img"
      />
    </div>
  )
}
