import st from "./footer.module.scss"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className={st["footer"]}>
      <div className={st["footer-left"]}>
        <div className={st["footer-left-top"]}>
          <div className={st["footer-content"]}>
            <div className={st["footer-title"]}>CONTACT</div>
            <div className={`${st["footer-text-16"]} ${st["mt30"]}`}>
              Email: info@mysite.com
            </div>
            <div className={st["footer-text-16"]}>Tel: 123-456-7890</div>
            <div className={st["footer-text-16"]}>
              Adresse: 500 Terry Francine Street SF, CA 94158
            </div>
          </div>
        </div>
        <div className={st["footer-left-bottom"]}>
          <div className={st["footer-content"]}>
            <div className={st["footer-title"]}>VISIT US</div>
            <div className={`${st["footer-text-16"]} ${st["mt30"]}`}>
              Mon - Fri: 8am - 8pm
            </div>
            <div className={st["footer-text-16"]}>Saturday: 9am - 7pm</div>
            <div className={`${st["footer-text-14"]} ${st["mt50"]}`}>
              © Copyright 2035
            </div>
          </div>
        </div>
      </div>
      <div className={st["footer-right"]}>
        <div className={st["footer-content"]}>
          <div className={st["footer-title"]}>SUBSCRIBE</div>
          <div className={`${st["footer-text-16"]} ${st["mt20"]}`}>
            Fill a glass & subscribe
          </div>
          <label className={`${st["checkbox"]} ${st["mt20"]}`}>
            <input type="checkbox" />
            <span className={st["checkmark"]}></span>
            Yes, subscribe me to your newsletter.
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
                Submit
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
            <div>Shipping & Returns</div>
            <div>FAQ</div>
          </div>
          <div className={`${st["footer-link-wrapp"]} ${st["mt10"]}`}>
            <div>Payment Methods</div>
            <div>Store Policy</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
