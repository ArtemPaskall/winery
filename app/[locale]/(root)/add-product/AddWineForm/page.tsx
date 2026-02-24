"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import st from "./add-product.module.scss"
import { useTranslations } from "next-intl"

const wineSchema = z.object({
  name: z.object({
    uk: z.string().min(1, "Обов'язково"),
    en: z.string().min(1, "Required"),
    ru: z.string().min(1, "Обязательно"),
  }),
  description: z.object({
    uk: z.string().min(1, "Обов'язково"),
    en: z.string().min(1, "Required"),
    ru: z.string().min(1, "Обязательно"),
  }),
  WineCategory: z.enum(
    ["red", "white", "rose", "sparkling", "dessert", "fortified"],
    {
      required_error: "Оберіть категорію",
    }
  ),
  volume: z.string().min(1, "Обов'язково"),
  price: z.string().min(1, "Обов'язково"),
  imageUrl: z.string().url("Некоректний URL").optional().or(z.literal("")),
})

type WineFormData = z.infer<typeof wineSchema>

const initialFormData: WineFormData = {
  name: { uk: "", en: "", ru: "" },
  description: { uk: "", en: "", ru: "" },
  WineCategory: "red",
  volume: "",
  price: "",
  imageUrl: "",
}

export default function AddWineForm() {
  const t = useTranslations("AddWine")

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
    const response = await fetch("/api/wines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      alert("Вино додано!")
      reset()
    } else {
      try {
        const errorData = await response.json()
        alert(`Помилка: ${errorData.message || JSON.stringify(errorData)}`)
      } catch (err) {
        const errorText = await response.text()
        console.error("Error while parsing error response:", err)
        alert(`Помилка 500. Сервер відповів: ${errorText}`)
      }
    }
  }

  return (
    <div className={st["form-wrapper"]}>
      <h2 className={st["form-header-1"]}>{t("title")}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={st["wine-form"]}>
        <h3 className={st["form-label"]}>{t("name")}</h3>

        <div className={st["error-wrapp"]}>
          {" "}
          {errors.name?.uk && (
            <p className={st["error"]}>{errors.name.uk.message}</p>
          )}
        </div>
        <input {...register("name.uk")} placeholder="Назва українською" />

        <div className={st["error-wrapp"]}>
          {" "}
          {errors.name?.en && (
            <p className={st["error"]}>{errors.name.en.message}</p>
          )}
        </div>
        <input {...register("name.en")} placeholder="Name in English" />

        <div className={st["error-wrapp"]}>
          {errors.name?.ru && (
            <p className={st["error"]}>{errors.name.ru.message}</p>
          )}
        </div>

        <input {...register("name.ru")} placeholder="Название на русском" />

        <h3 className={st["form-label"]}>{t("description")}</h3>
        <div className={st["error-wrapp"]}>
          {" "}
          {errors.description?.uk && (
            <p className={st["error"]}>{errors.description.uk.message}</p>
          )}
        </div>
        <textarea
          {...register("description.uk")}
          placeholder="Опис українською"
        />

        <div className={st["error-wrapp"]}>
          {" "}
          {errors.description?.en && (
            <p className={st["error"]}>{errors.description.en.message}</p>
          )}
        </div>
        <textarea
          {...register("description.en")}
          placeholder="Description in English"
        />

        <div className={st["error-wrapp"]}>
          {" "}
          {errors.description?.ru && (
            <p className={st["error"]}>{errors.description.ru.message}</p>
          )}
        </div>
        <textarea
          {...register("description.ru")}
          placeholder="Описание на русском"
        />

        <div className={st["error-wrapp"]}>
          {" "}
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
          {" "}
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
          {" "}
          {errors.price && (
            <p className={st["error"]}>{errors.price.message}</p>
          )}
        </div>
        <input type="number" {...register("price")} placeholder={t("price")} />

        <div className={st["error-wrapp"]}>
          {" "}
          {errors.imageUrl && (
            <p className={st["error"]}>{errors.imageUrl.message}</p>
          )}
        </div>
        <input {...register("imageUrl")} placeholder={t("url-img")} />

        <button type="submit">{t("submit")}</button>
      </form>
    </div>
  )
}
