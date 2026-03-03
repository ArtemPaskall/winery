"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import st from "./add-product.module.scss"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function AddWineForm() {
  const t = useTranslations("AddWine")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    const reader = new FileReader()
    reader.onloadend = () => {
      setImageSrc(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/uploadFile", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()
    return data.url
  }

  function closeImagePreload() {
    setImageSrc(null)
    setFile(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const wineSchema = z.object({
    title: z.object({
      uk: z
        .string()
        .trim()
        .min(3, { message: t("min_3_characters") })
        .max(100, { message: t("max_100_characters") }),
      en: z
        .string()
        .trim()
        .min(3, { message: t("min_3_characters") })
        .max(100, { message: t("max_100_characters") }),
      ru: z
        .string()
        .trim()
        .min(3, { message: t("min_3_characters") })
        .max(100, { message: t("max_100_characters") }),
    }),
    description: z.object({
      uk: z
        .string()
        .trim()
        .min(5, { message: t("min_5_characters") })
        .max(2000, { message: t("max_2000_characters") }),
      en: z
        .string()
        .trim()
        .min(5, { message: t("min_5_characters") })
        .max(2000, { message: t("max_2000_characters") }),
      ru: z
        .string()
        .trim()
        .min(5, { message: t("min_5_characters") })
        .max(2000, { message: t("max_2000_characters") }),
    }),
    WineCategory: z.enum(
      ["red", "white", "rose", "sparkling", "dessert", "fortified"],
      {
        required_error: t("required_category"),
        invalid_type_error: t("invalid_category"),
      }
    ),
    volume: z
      .string({ required_error: t("required") })
      .trim()
      .min(1, { message: t("required") })
      .refine((val) => !isNaN(Number(val)), { message: t("must_be_number") })
      .refine((val) => Number(val) > 0, { message: t("greater_than_0") }),
    price: z
      .string({ required_error: t("required") })
      .trim()
      .min(1, { message: t("required") })
      .refine((val) => !isNaN(Number(val)), { message: t("must_be_number") })
      .refine((val) => Number(val) > 0, { message: t("greater_than_0") }),
    imageUrl: z.string().optional(),
  })

  type WineFormData = z.infer<typeof wineSchema>

  const initialFormData: Partial<WineFormData> = {
    title: { uk: "", en: "", ru: "" },
    description: { uk: "", en: "", ru: "" },
    WineCategory: "red",
    imageUrl: "",
  }

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
      let imageUrl = ""

      if (file) {
        imageUrl = await uploadToCloudinary(file)
      }

      const payload = {
        ...data,
        volume: Number(data.volume),
        price: Number(data.price),
        ...(imageUrl && { imageUrl }),
      }

      const response = await fetch("/api/wines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setMessage({ type: "success", text: t("addWineSuccess") })
        reset()
        setImageSrc(null)
        setFile(null)
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
      }, 5000)

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

        <label className={st.uploadButton}>
          {t("uploadPhoto")}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={st.hiddenInput}
          />
        </label>

        {imageSrc && (
          <div className={st["image-preload-wrapp"]}>
            <Image
              src={imageSrc}
              alt="preview"
              width={200}
              height={200}
              className={st["image-preload"]}
            />
            <Image
              src={"/red-circle-cross-close.png"}
              alt="preview"
              width={20}
              height={20}
              onClick={closeImagePreload}
              className={st["image-preload-close"]}
            />
          </div>
        )}

        {message && (
          <div
            className={`${st.message} ${
              message.type === "success" ? st.success : st.errorMessage
            }`}
          >
            {message.type === "success" && (
              <Image
                src={"/add-wine-success.png"}
                alt="success image"
                width={200}
                height={200}
                className={st["success-img"]}
              ></Image>
            )}

            {message.text}
          </div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? <span className={st.spinner}></span> : t("submit")}
        </button>
      </form>
    </div>
  )
}
