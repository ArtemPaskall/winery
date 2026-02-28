"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import st from "./add-product.module.scss"
import { useTranslations } from "next-intl"

export const wineSchema = z.object({
  title: z.object({
    uk: z
      .string()
      .trim()
      .min(3, "Мінімум 3 символи")
      .max(100, "Максимум 100 символів"),
    en: z
      .string()
      .trim()
      .min(3, "Minimum 3 characters")
      .max(100, "Maximum 100 characters"),
    ru: z
      .string()
      .trim()
      .min(3, "Минимум 3 символа")
      .max(100, "Максимум 100 символов"),
  }),

  description: z.object({
    uk: z
      .string()
      .trim()
      .min(5, "Мінімум 5 символів")
      .max(2000, "Занадто довгий опис"),
    en: z
      .string()
      .trim()
      .min(5, "Minimum 5 characters")
      .max(2000, "Description too long"),
    ru: z
      .string()
      .trim()
      .min(5, "Минимум 5 символов")
      .max(2000, "Слишком длинное описание"),
  }),

  WineCategory: z.enum(
    ["red", "white", "rose", "sparkling", "dessert", "fortified"],
    {
      required_error: "Оберіть категорію",
      invalid_type_error: "Некоректна категорія",
    }
  ),

  volume: z
    .string({ required_error: "Обʼєм обовʼязковий" })
    .trim()
    .min(1, "Обʼєм обовʼязковий")
    .refine((val) => !isNaN(Number(val)), {
      message: "Має бути число",
    })
    .refine((val) => Number(val) > 0, {
      message: "Має бути більше 0",
    }),
  price: z
    .string({ required_error: "Ціна обовʼязкова" })
    .trim()
    .min(1, "Ціна обовʼязкова")
    .refine((val) => !isNaN(Number(val)), {
      message: "Має бути число",
    })
    .refine((val) => Number(val) > 0, {
      message: "Має бути більше 0",
    }),
  imageUrl: z
    .string()
    .trim()
    .url("Некоректний URL")
    .optional()
    .or(z.literal("")),
})

type WineFormData = z.infer<typeof wineSchema>

const initialFormData: Partial<WineFormData> = {
  title: { uk: "", en: "", ru: "" },
  description: { uk: "", en: "", ru: "" },
  WineCategory: "red",
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
        alert("Вино додано!")
        reset()
      } else {
        const errorData = await response.json().catch(() => null)
        alert(`Помилка: ${errorData?.message || response.statusText}`)
      }
    } catch (err) {
      console.error("Network error:", err)
      alert("Помилка мережі. Спробуйте пізніше.")
    }
  }

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

        <button type="submit">{t("submit")}</button>
      </form>
    </div>
  )
}
