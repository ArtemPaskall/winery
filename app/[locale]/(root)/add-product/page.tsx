"use client"

import { useState } from "react"
import "./add-product.scss"

type Multilang = { uk: string; en: string; ru: string }

type WineFormData = {
  name: Multilang
  description: Multilang
  wineType: string
  volume: string
  price: string
  imageUrl: string
}

const initialFormData: WineFormData = {
  name: { uk: "", en: "", ru: "" },
  description: { uk: "", en: "", ru: "" },
  wineType: "red",
  volume: "",
  price: "",
  imageUrl: "",
}

export default function AddWinePage() {
  const [formData, setFormData] = useState<WineFormData>(initialFormData)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, dataset } = e.target

    if (dataset.lang) {
      const lang = dataset.lang as keyof Multilang
      setFormData((prev) => ({
        ...prev,
        [name]: {
          ...prev[name as keyof Pick<WineFormData, "name" | "description">],
          [lang]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch("/api/wines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        volume: parseInt(formData.volume),
      }),
    })

    if (response.ok) {
      alert("Вино додано!")
      setFormData(initialFormData)
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
    <div className="form-wrapper">
      <h1>Додати нове вино</h1>
      <form onSubmit={handleSubmit} className="wine-form">
        <h3>Назва</h3>
        <input
          name="name"
          data-lang="uk"
          value={formData.name.uk}
          onChange={handleChange}
          placeholder="Назва українською"
        />
        <input
          name="name"
          data-lang="en"
          value={formData.name.en}
          onChange={handleChange}
          placeholder="Name in English"
        />
        <input
          name="name"
          data-lang="ru"
          value={formData.name.ru}
          onChange={handleChange}
          placeholder="Название на русском"
        />

        <h3>Опис</h3>
        <textarea
          name="description"
          data-lang="uk"
          value={formData.description.uk}
          onChange={handleChange}
          placeholder="Опис українською"
        />
        <textarea
          name="description"
          data-lang="en"
          value={formData.description.en}
          onChange={handleChange}
          placeholder="Description in English"
        />
        <textarea
          name="description"
          data-lang="ru"
          value={formData.description.ru}
          onChange={handleChange}
          placeholder="Описание на русском"
        />

        <select
          name="wineType"
          value={formData.wineType}
          onChange={handleChange}
          required
        >
          <option value="red">Червоне</option>
          <option value="white">Біле</option>
          <option value="rosé">Рожеве</option>
          <option value="sparkling">Ігристе</option>
          <option value="dessert">Десертне</option>
          <option value="fortified">Кріплене</option>
        </select>

        <input
          name="volume"
          value={formData.volume}
          onChange={handleChange}
          placeholder="Обʼєм (мл)"
          type="number"
          required
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Ціна"
          type="number"
          step="0.01"
          required
        />
        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="URL зображення (необов'язково)"
        />

        <button type="submit">Додати</button>
      </form>
    </div>
  )
}
