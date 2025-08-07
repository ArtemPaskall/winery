"use client"

import { useState } from "react"
import "./add-product.scss"

export default function AddWinePage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    vintage: "",
    alcoholContent: "",
    wineType: "red",
    volume: "",
    imageUrl: "",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/wines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        vintage: parseInt(formData.vintage),
        alcoholContent: parseFloat(formData.alcoholContent),
        volume: parseInt(formData.volume),
      }),
    })

    if (response.ok) {
      alert("Вино додано!")
      setFormData({
        name: "",
        description: "",
        price: "",
        vintage: "",
        alcoholContent: "",
        wineType: "red",
        volume: "",
        imageUrl: "",
      })
    } else {
      alert("Помилка при додаванні вина")
    }
  }

  return (
    <div className="form-wrapper">
      <h1>Додати нове вино</h1>
      <form onSubmit={handleSubmit} className="wine-form">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Назва"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Опис"
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
