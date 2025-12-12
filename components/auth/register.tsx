"use client"

import type React from "react"

import { useState } from "react"

interface RegisterProps {
  onBack: () => void
  onRegister: (data: any) => Promise<boolean>
}

export default function Register({ onBack, onRegister }: RegisterProps) {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.password_confirmation) {
      setError("As senhas não coincidem")
      return
    }

    const success = await onRegister(form)
    if (!success) setError("Falha no registro")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-slate-800/95 backdrop-blur-sm rounded-3xl p-10 w-full max-w-md border border-purple-500/30">
        <button
          onClick={onBack}
          className="mb-5 bg-transparent border-none text-purple-500 cursor-pointer text-base hover:text-purple-400"
        >
          ← Voltar
        </button>

        <h2 className="text-white text-center text-2xl mb-5">Criar Conta</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
          />

          <input
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
          />

          <input
            name="password_confirmation"
            type="password"
            placeholder="Confirmar Senha"
            value={form.password_confirmation}
            onChange={handleChange}
            className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
          />

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition"
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  )
}
