import { z } from "zod"

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
