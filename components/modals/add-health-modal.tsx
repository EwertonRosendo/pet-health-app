"use client"

import type React from "react"

import { useState } from "react"

interface AddHealthModalProps {
  onClose: () => void
  onAdd: (item: any) => void
}

export default function AddHealthModal({ onClose, onAdd }: AddHealthModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("alimentacao")
  const [photos, setPhotos] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files))
    }
  }

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return

    const item = { title, description, category, photos }
    onAdd(item)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
      <div className="bg-slate-800 p-6 rounded-2xl w-full max-w-md">
        <h2 className="text-white text-2xl mb-5">Adicionar Item</h2>

        <div className="space-y-4">
          <input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
          />

          <input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
          >
            <option value="alimentacao">Alimentação</option>
            <option value="registros">Registros</option>
            <option value="consultas">Consultas</option>
          </select>

          {category === "registros" && (
            <div>
              <label className="text-white mb-2 block">Anexar Fotos:</label>
              <input type="file" accept="image/*" multiple onChange={handleFileChange} className="text-white" />
              {photos.length > 0 && <p className="text-purple-500 mt-2">{photos.length} foto(s) selecionada(s)</p>}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition"
            >
              Salvar
            </button>
            <button
              onClick={onClose}
              className="flex-1 p-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
