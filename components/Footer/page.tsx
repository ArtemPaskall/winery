import { getTranslations } from "next-intl/server"
import st from "./footer.module.scss"
import Image from "next/image"

export default async function Footer() {
  const t = await getTranslations("FooterPage")

  return (
    <footer className={st["footer"]}>
      <div className={st["footer-left"]}>
        <div className={st["footer-left-top"]}>
          <div className={st["footer-content"]}>
            <div className={st["footer-title"]}>{t("Contact")}</div>
            <div className={`${st["footer-text-16"]} ${st["mt30"]}`}>
              Email: info@mysite.com
            </div>
            <div className={st["footer-text-16"]}>{t("Tel")}: 123-456-7890</div>
            <div className={st["footer-text-16"]}>
              {t("Address")}: 500 Terry Francine Street SF, CA 94158
            </div>
          </div>
        </div>
        <div className={st["footer-left-bottom"]}>
          <div className={st["footer-content"]}>
            <div className={st["footer-title"]}>{t("visit-us")}</div>
            <div className={`${st["footer-text-16"]} ${st["mt30"]}`}>
              {t("mon-fri")}: 8am - 8pm
            </div>
            <div className={st["footer-text-16"]}>
              {t("Saturday")}: 9am - 7pm
            </div>
            <div className={`${st["footer-text-14"]} ${st["mt50"]}`}>
              © Copyright 2035
            </div>
          </div>
        </div>
      </div>
      <div className={st["footer-right"]}>
        <div className={st["footer-content"]}>
          <div className={st["footer-title"]}> {t("Subscribe")}</div>
          <div className={`${st["footer-text-16"]} ${st["mt20"]}`}>
            {t("fill-glass")}
          </div>
          <label className={`${st["checkbox"]} ${st["mt20"]}`}>
            <input type="checkbox" />
            <span className={st["checkmark"]}></span>
            {t("email-checkbox")}
          </label>
          <div className={`${st["email"]} ${st["mt20"]}`}>
            <label htmlFor="email" className={st["email-label"]}>
              Email:
            </label>
            <div className={st["input-wrapp"]}>
              <input
                id="email"
                name="email"
                type="email"
                className={st["email-input"]}
              />
              <button type="button" className={st["email-button"]}>
                {t("Submit")}
              </button>
            </div>
          </div>
          <div className={st["social-wrapp"]}>
            <div className={st["social-link"]}>
              <Image
                alt="social"
                src={"/social-1.avif"}
                width={50}
                height={50}
              ></Image>
            </div>
            <div className={st["social-link"]}>
              <Image
                alt="social"
                src={"/social-2.avif"}
                width={50}
                height={50}
              ></Image>
            </div>
            <div className={st["social-link"]}>
              <Image
                alt="social"
                src={"/social-3.avif"}
                width={50}
                height={50}
              ></Image>
            </div>
          </div>
          <div className={`${st["footer-link-wrapp"]} ${st["mt30"]}`}>
            <div> {t("Shipping")}</div>
            <div> {t("FAQ")}</div>
          </div>
          <div className={`${st["footer-link-wrapp"]} ${st["mt10"]}`}>
            <div>{t("Payment")}</div>
            <div>{t("Store")}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
