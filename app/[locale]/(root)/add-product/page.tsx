"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import st from "./add-product.module.scss"

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
    ["red", "white", "rosé", "sparkling", "dessert", "fortified"],
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

export default function AddWinePage() {
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
      <h1>Додати нове вино</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={st["wine-form"]}>
        <h3>Назва</h3>
        <input {...register("name.uk")} placeholder="Назва українською" />
        {errors.name?.uk && <p>{errors.name.uk.message}</p>}

        <input {...register("name.en")} placeholder="Name in English" />
        {errors.name?.en && <p>{errors.name.en.message}</p>}

        <input {...register("name.ru")} placeholder="Название на русском" />
        {errors.name?.ru && <p>{errors.name.ru.message}</p>}

        <h3>Опис</h3>
        <textarea
          {...register("description.uk")}
          placeholder="Опис українською"
        />
        {errors.description?.uk && <p>{errors.description.uk.message}</p>}

        <textarea
          {...register("description.en")}
          placeholder="Description in English"
        />
        {errors.description?.en && <p>{errors.description.en.message}</p>}

        <textarea
          {...register("description.ru")}
          placeholder="Описание на русском"
        />
        {errors.description?.ru && <p>{errors.description.ru.message}</p>}

        <select {...register("WineCategory")}>
          <option value="red">Червоне</option>
          <option value="white">Біле</option>
          <option value="rosé">Рожеве</option>
          <option value="sparkling">Ігристе</option>
          <option value="dessert">Десертне</option>
          <option value="fortified">Кріплене</option>
        </select>
        {errors.WineCategory && <p>{errors.WineCategory.message}</p>}

        <input type="number" {...register("volume")} placeholder="Обʼєм (мл)" />
        {errors.volume && <p>{errors.volume.message}</p>}

        <input
          type="number"
          step="0.01"
          {...register("price")}
          placeholder="Ціна"
        />
        {errors.price && <p>{errors.price.message}</p>}

        <input
          {...register("imageUrl")}
          placeholder="URL зображення (необов'язково)"
        />
        {errors.imageUrl && <p>{errors.imageUrl.message}</p>}

        <button type="submit">Додати</button>
      </form>
    </div>
  )
}
