"use client"

import type React from "react"

import { useState } from "react"
import Register from "./register"

interface AuthScreenProps {
  onLogin: (email: string, password: string) => Promise<boolean>
  onRegister: (data: any) => Promise<boolean>
}

export default function AuthScreen({ onLogin, onRegister }: AuthScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showRegister, setShowRegister] = useState(false)

  if (showRegister) {
    return <Register onBack={() => setShowRegister(false)} onRegister={onRegister} />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await onLogin(email, password)
    if (!success) setError("Email ou senha incorretos")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="bg-slate-800/95 backdrop-blur-sm rounded-3xl p-10 w-full max-w-md border border-purple-500/30">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐱</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            CatPet
          </h1>
          <p className="text-slate-400">Seu Pet, Nossa Missão</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-slate-700 border-2 border-slate-600 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition"
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => {
              setEmail("maria@email.com")
              setPassword("123456")
            }}
            className="w-full p-3 bg-slate-600 text-white font-bold rounded-xl hover:bg-slate-700 transition"
          >
            🚀 Demo
          </button>
        </form>

        {/* Register Button */}
        <button
          type="button"
          onClick={() => setShowRegister(true)}
          className="mt-5 w-full p-3 bg-transparent border-2 border-purple-500 text-purple-500 font-bold rounded-xl hover:bg-purple-500/10 transition"
        >
          Criar Conta
        </button>

        <p className="text-center text-slate-400 text-sm mt-6">Demo: maria@email.com / 123456</p>
      </div>
    </div>
  )
}
