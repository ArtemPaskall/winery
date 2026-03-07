import st from "./footer.module.scss"

export default function Footer() {
  return (
    <>
      {/* <div className={st["footer"]}>
        <div className={st["footer-left"]}>
          <div className={st["footer-left-top"]}>asf</div>
          <div className={st["footer-left-bottom"]}>asf</div>
        </div>
        <div className={st["footer-right"]}>asfd</div>
      </div> */}

      <div className={st["footer"]}>
        <div className={st["footer-left"]}>
          <div className={st["footer-left-top"]}>
            <div className={st["footer-left-top-inner"]}>Ліво верх контент</div>
          </div>
          <div className={st["footer-left-bottom"]}>
            <div className={st["footer-left-bottom-inner"]}>
              Ліво низ контент
            </div>
          </div>
        </div>
        <div className={st["footer-right"]}>
          <div className={st["footer-right-inner"]}>Право контент</div>
        </div>
      </div>
    </>
  )
}
