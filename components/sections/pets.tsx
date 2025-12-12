"use client"

import { SPECIES_EMOJIS } from "@/lib/constants"

interface PetsProps {
  pets: any[]
  onAdd: () => void
}

export default function Pets({ pets, onAdd }: PetsProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-3xl font-bold">Meus Pets</h2>
        <button
          onClick={onAdd}
          className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 border-none rounded-full text-white text-2xl cursor-pointer hover:opacity-90 transition"
        >
          +
        </button>
      </div>

      {pets.map((pet) => (
        <div
          key={pet.id}
          className="bg-slate-700/50 backdrop-blur-lg border border-slate-600/30 rounded-2xl p-5 mb-5 cursor-pointer hover:border-slate-500/50 transition flex items-center gap-4"
        >
          <div className="text-5xl">{SPECIES_EMOJIS[pet.specie?.toLowerCase()] || SPECIES_EMOJIS.default}</div>

          <div className="flex-1">
            <h3 className="text-white text-xl font-bold">{pet.name}</h3>
            <p className="text-slate-400 text-sm my-1">
              {pet.breed} • {pet.age} anos
            </p>
            <span
              className={`px-3 py-1 rounded-xl text-xs ${
                pet.status === "healthy" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
              }`}
            >
              {pet.status === "healthy" ? "✓ Saudável" : "⚠ Atenção"}
            </span>
          </div>

          <div className="text-xl text-slate-500">📅</div>
        </div>
      ))}
    </div>
  )
}
