"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export default function Connect() {
  const [doctors, setDoctors] = useState<any[]>([])

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const cached = localStorage.getItem("catpet_doctors")
      if (cached) setDoctors(JSON.parse(cached))

      const response = await axios.get("http://52.72.103.241:3000/doctors")

      const list = response.data.map((doc: any) => ({
        ...doc,
        status: Math.random() > 0.5 ? "online" : "busy",
      }))

      setDoctors(list)
      localStorage.setItem("catpet_doctors", JSON.stringify(list))
    } catch (error) {
      console.error("Error fetching doctors:", error)
    }
  }

  const openWhatsApp = (phone: string) => {
    if (!phone) return
    const cleanPhone = phone.replace(/\D/g, "")
    window.open(`https://api.whatsapp.com/send/?phone=55${cleanPhone}`, "_blank")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-3xl font-bold">PetConnect</h2>
        <button className="px-4 py-2 bg-red-500/20 text-red-500 border border-red-500/30 rounded-xl cursor-pointer text-sm hover:bg-red-500/30 transition">
          🚨 Emergência
        </button>
      </div>

      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          onClick={() => openWhatsApp(doctor.phone)}
          className="bg-slate-700/50 backdrop-blur-lg border border-slate-600/30 rounded-2xl p-5 mb-5 cursor-pointer hover:border-slate-500/50 transition flex items-center gap-4"
        >
          {/* Avatar */}
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl">
              👨‍⚕️
            </div>
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                doctor.status === "online" ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-white font-bold text-base">{doctor.name}</h3>
            <p className="text-slate-400 text-sm my-1">{doctor.specialty}</p>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span className="text-yellow-500 text-sm font-medium">{doctor.rating}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="text-right">
            <button
              className={`px-4 py-2 border-none rounded-xl text-white cursor-pointer mb-1 ${
                doctor.status === "online" ? "bg-green-500" : "bg-slate-600"
              }`}
            >
              💬
            </button>
            <p className="text-slate-400 text-xs">R$ {doctor.price}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
