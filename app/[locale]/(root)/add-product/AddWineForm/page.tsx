"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { wineSchema } from "./wineSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import st from "./add-product.module.scss"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

type WineFormData = z.infer<typeof wineSchema>

const initialFormData: Partial<WineFormData> = {
  title: { uk: "", en: "", ru: "" },
  description: { uk: "", en: "", ru: "" },
  WineCategory: "red",
  imageUrl: "",
}

export default function AddWineForm() {
  const t = useTranslations("AddWine")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)
  // } | null>({ type: "success", text: "asdfafs" })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WineFormData>({
    resolver: zodResolver(wineSchema),
    defaultValues: initialFormData,
  })

  const onSubmit = async (data: WineFormData) => {
    setLoading(true)

    try {
      const payload = {
        ...data,
        volume: Number(data.volume),
        price: Number(data.price),
      }

      const response = await fetch("/api/wines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setMessage({ type: "success", text: "Вино додано!" })
        reset()
      } else {
        const errorData = await response.json().catch(() => null)
        setMessage({
          type: "error",
          text: `Помилка: ${errorData?.message || response.statusText}`,
        })
      }
    } catch (err) {
      console.error("Network error:", err)
      alert("Помилка мережі. Спробуйте пізніше.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div className={st["form-wrapper"]}>
      <h2 className={st["form-header-1"]}>{t("title")}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={st["wine-form"]}>
        <h3 className={st["form-label"]}>{t("name")}</h3>

        <div className={st["error-wrapp"]}>
          {errors.title?.uk && (
            <p className={st["error"]}>{errors.title.uk.message}</p>
          )}
        </div>
        <input {...register("title.uk")} placeholder="Назва українською" />

        <div className={st["error-wrapp"]}>
          {errors.title?.en && (
            <p className={st["error"]}>{errors.title.en.message}</p>
          )}
        </div>
        <input {...register("title.en")} placeholder="Name in English" />

        <div className={st["error-wrapp"]}>
          {errors.title?.ru && (
            <p className={st["error"]}>{errors.title.ru.message}</p>
          )}
        </div>

        <input {...register("title.ru")} placeholder="Название на русском" />

        <h3 className={st["form-label"]}>{t("description")}</h3>
        <div className={st["error-wrapp"]}>
          {errors.description?.uk && (
            <p className={st["error"]}>{errors.description.uk.message}</p>
          )}
        </div>
        <textarea
          {...register("description.uk")}
          placeholder="Опис українською"
        />

        <div className={st["error-wrapp"]}>
          {errors.description?.en && (
            <p className={st["error"]}>{errors.description.en.message}</p>
          )}
        </div>
        <textarea
          {...register("description.en")}
          placeholder="Description in English"
        />

        <div className={st["error-wrapp"]}>
          {errors.description?.ru && (
            <p className={st["error"]}>{errors.description.ru.message}</p>
          )}
        </div>
        <textarea
          {...register("description.ru")}
          placeholder="Описание на русском"
        />

        <div className={st["error-wrapp"]}>
          {errors.WineCategory && (
            <p className={st["error"]}>{errors.WineCategory.message}</p>
          )}
        </div>
        <select {...register("WineCategory")}>
          <option value="red">{t("WineCategory.red")}</option>
          <option value="white">{t("WineCategory.white")}</option>
          <option value="rose">{t("WineCategory.rose")}</option>
          <option value="sparkling">{t("WineCategory.sparkling")}</option>
          <option value="dessert">{t("WineCategory.dessert")}</option>
          <option value="fortified">{t("WineCategory.fortified")}</option>
        </select>

        <div className={st["error-wrapp"]}>
          {errors.volume && (
            <p className={st["error"]}>{errors.volume.message}</p>
          )}
        </div>
        <input
          type="number"
          {...register("volume")}
          placeholder={t("volume")}
        />

        <div className={st["error-wrapp"]}>
          {errors.price && (
            <p className={st["error"]}>{errors.price.message}</p>
          )}
        </div>
        <input type="number" {...register("price")} placeholder={t("price")} />

        <div className={st["error-wrapp"]}>
          {errors.imageUrl && (
            <p className={st["error"]}>{errors.imageUrl.message}</p>
          )}
        </div>
        <input {...register("imageUrl")} placeholder={t("url-img")} />

        <button type="submit" disabled={loading}>
          {loading ? <span className={st.spinner}></span> : t("submit")}
        </button>

        {message && (
          <div
            className={`${st.message} ${
              message.type === "success" ? st.success : st.error
            }`}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  )
}
