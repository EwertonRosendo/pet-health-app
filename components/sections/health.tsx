"use client"

import { useState, useEffect } from "react"

interface HealthProps {
  onAdd: () => void
}

export default function Health({ onAdd }: HealthProps) {
  const [tab, setTab] = useState("alimentacao")
  const [alimentacoes, setAlimentacoes] = useState<any[]>([])
  const [registros, setRegistros] = useState<any[]>([])
  const [consultas, setConsultas] = useState<any[]>([])

  useEffect(() => {
    const loadData = () => {
      const alim = localStorage.getItem("catpet_alimentacoes")
      const reg = localStorage.getItem("catpet_registros")
      const cons = localStorage.getItem("catpet_consultas")

      if (alim) setAlimentacoes(JSON.parse(alim))
      if (reg) setRegistros(JSON.parse(reg))
      if (cons) setConsultas(JSON.parse(cons))
    }

    loadData()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-white text-3xl font-bold">Saúde & Cuidados</h2>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl border-none text-white cursor-pointer font-bold hover:opacity-90 transition"
        >
          + Add
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-slate-700/50 rounded-xl p-1 mb-6">
        <TabButton active={tab === "alimentacao"} onClick={() => setTab("alimentacao")}>
          Alimentação
        </TabButton>
        <TabButton active={tab === "registros"} onClick={() => setTab("registros")}>
          Registros
        </TabButton>
        <TabButton active={tab === "consultas"} onClick={() => setTab("consultas")}>
          Consultas
        </TabButton>
      </div>

      {/* Content */}
      {tab === "alimentacao" && (
        <div>
          {alimentacoes.map((item) => (
            <FeedItem key={item.id} time={new Date(item.created_at).toLocaleDateString("pt-BR")} meal={item.title} pet={item.description} />
          ))}
        </div>
      )}

      {tab === "registros" && (
        <div>
          {registros.map((item) => (
            <div
              key={item.id}
              className="bg-slate-700/50 backdrop-blur-lg border border-slate-600/30 rounded-2xl p-5 mb-3"
            >
              {item.photo_url && (
                <img
                  src={item.photo_url || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-44 object-cover rounded-xl mb-3"
                />
              )}
              <h3 className="text-white font-bold mb-1">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "consultas" && (
        <div>
          {consultas.map((item) => (
            <div
              key={item.id}
              className="bg-slate-700/50 backdrop-blur-lg border border-slate-600/30 rounded-2xl p-5 mb-3"
            >
              <h3 className="text-white font-bold mb-1">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TabButton({ active, onClick, children }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 border-none rounded-lg cursor-pointer text-sm font-medium transition ${
        active ? "bg-purple-600 text-white" : "bg-transparent text-slate-400 hover:text-slate-300"
      }`}
    >
      {children}
    </button>
  )
}

function FeedItem({ time, meal, pet }: any) {
  const [checked, setChecked] = useState(false)

  return (
    <div className="bg-slate-700/50 backdrop-blur-lg border border-slate-600/30 rounded-2xl p-5 mb-5 flex items-center gap-4">
      <div className="text-center">
        <div className="text-white font-bold text-base">{time}</div>
        <div className="text-slate-400 text-xs">{meal}</div>
      </div>

      <div className="flex-1 text-slate-300 text-sm">{pet}</div>

      <button
        onClick={() => setChecked(!checked)}
        className={`w-10 h-10 border-none rounded-full text-white cursor-pointer text-xl transition ${
          checked ? "bg-green-500" : "bg-slate-600 hover:bg-slate-500"
        }`}
      >
        {checked && "✓"}
      </button>
    </div>
  )
}
