"use client"

import type React from "react"

import { useState } from "react"

interface AddPetModalProps {
  onClose: () => void
  onAdd: (data: any) => void
}

export default function AddPetModal({ onClose, onAdd }: AddPetModalProps) {
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(form)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
      <div className="bg-slate-800 p-6 rounded-2xl w-full max-w-md">
        <h2 className="text-white text-2xl mb-5">Adicionar Pet</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
            required
          />

          <select
            name="species"
            value={form.species}
            onChange={handleChange}
            className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
            required
          >
            <option value="">Selecione a espécie</option>
            <option value="cat">Gato 🐱</option>
            <option value="dog">Cachorro 🐶</option>
            <option value="bird">Pássaro 🐦</option>
            <option value="fish">Peixe 🐠</option>
            <option value="rabbit">Coelho 🐰</option>
            <option value="hamster">Hamster 🐹</option>
            <option value="turtle">Tartaruga 🐢</option>
            <option value="snake">Cobra 🐍</option>
          </select>

          <input
            name="breed"
            placeholder="Raça"
            value={form.breed}
            onChange={handleChange}
            className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
            required
          />

          <input
            name="age"
            type="number"
            placeholder="Idade"
            value={form.age}
            onChange={handleChange}
            className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
            required
          />

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition"
          >
            Salvar
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 w-full p-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
