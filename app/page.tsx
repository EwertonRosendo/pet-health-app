"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import AuthScreen from "@/components/auth/auth-screen"
import Header from "@/components/layout/header"
import BottomNav from "@/components/layout/bottom-nav"
import Home from "@/components/sections/home"
import Pets from "@/components/sections/pets"
import Health from "@/components/sections/health"
import Quest from "@/components/sections/quest"
import Connect from "@/components/sections/connect"
import AddPetModal from "@/components/modals/add-pet-modal"
import AddHealthModal from "@/components/modals/add-health-modal"
import Notification from "@/components/ui/notification"
import { useAuth } from "@/hooks/use-auth"
import { useHealthData } from "@/hooks/use-health-data"

export default function App() {
  // Auth state
  const { user, isAuth, login, register, logout } = useAuth()

  // Navigation state
  const [section, setSection] = useState("home")
  const [modal, setModal] = useState<string | null>(null)
  const [notif, setNotif] = useState<{ title: string; msg: string } | null>(null)

  // Data state
  const [pets, setPets] = useState<any[]>([])
  const [quests, setQuests] = useState<any[]>([])
  const [stats, setStats] = useState({ xp: 127, level: 3, completed: 8 })

  const { alimentacoes, registros, consultas, fetchAlimentacoes, fetchRegistros, fetchConsultas, addHealthItem } =
    useHealthData()

  // Load initial data
  useEffect(() => {
    if (isAuth) {
      fetchPets()
      fetchQuests()
      fetchAlimentacoes()
      fetchRegistros()
      fetchConsultas()
    }
  }, [isAuth])

  const fetchPets = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("catpet_user") || "{}")
      const token = localStorage.getItem("catpet_token")

      if (!userData.id || !token) return

      const cached = localStorage.getItem("catpet_pets")
      if (cached) setPets(JSON.parse(cached))

      const response = await axios.get(`http://52.72.103.241:3000/users/${userData.id}/pets`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const petsList = response.data.pets || response.data
      setPets(petsList)
      localStorage.setItem("catpet_pets", JSON.stringify(petsList))
    } catch (error) {
      console.error("Error fetching pets:", error)
    }
  }

  const fetchQuests = async () => {
    try {
      const token = localStorage.getItem("catpet_token")
      if (!token) return

      const cached = localStorage.getItem("catpet_quests")
      if (cached) setQuests(JSON.parse(cached))

      const response = await axios.get("http://52.72.103.241:3000/quests", {
        headers: { Authorization: `Bearer ${token}` },
      })

      setQuests(response.data)
      localStorage.setItem("catpet_quests", JSON.stringify(response.data))
    } catch (error) {
      console.error("Error fetching quests:", error)
    }
  }

  const addPet = async (data: any) => {
    try {
      const userData = JSON.parse(localStorage.getItem("catpet_user") || "{}")
      const token = localStorage.getItem("catpet_token")

      if (!userData.id || !token) {
        showNotif("Erro", "Usuário não autenticado")
        return
      }

      const body = {
        pet: {
          name: data.name,
          species: data.species,
          breed: data.breed,
          age: Number(data.age),
        },
      }

      const response = await axios.post(`http://52.72.103.241:3000/users/${userData.id}/pets`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const newPet = response.data.pet || response.data
      const updatedPets = [...pets, newPet]

      setPets(updatedPets)
      localStorage.setItem("catpet_pets", JSON.stringify(updatedPets))
      setModal(null)
      showNotif("Pet Adicionado! 🎉", `${newPet.name} foi adicionado!`)
    } catch (error: any) {
      console.error("Error adding pet:", error)
      showNotif("Erro", error.response?.data?.error || "Não foi possível adicionar o pet")
    }
  }

  const completeQuest = (id: number) => {
    setQuests(
      quests.map((q) => {
        if (q.id === id && q.active) {
          const newProg = q.progress + 1
          if (newProg >= q.total) {
            setStats((s) => ({ ...s, xp: s.xp + q.xp, completed: s.completed + 1 }))
            showNotif("🎉 Missão Completa!", `+${q.xp} XP ganhos!`)
            return { ...q, progress: newProg, active: false }
          }
          return { ...q, progress: newProg }
        }
        return q
      }),
    )
  }

  const showNotif = (title: string, msg: string) => {
    setNotif({ title, msg })
    setTimeout(() => setNotif(null), 3000)
  }

  if (!isAuth) {
    return <AuthScreen onLogin={login} onRegister={register} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <div className="max-w-[414px] mx-auto bg-[#1e293b] min-h-screen relative">
        <Header user={user} stats={stats} onLogout={logout} />

        <div className="pb-24 p-5">
          {section === "home" && <Home stats={stats} pets={pets} />}
          {section === "pets" && <Pets pets={pets} onAdd={() => setModal("pet")} />}
          {section === "health" && <Health onAdd={() => setModal("health")} />}
          {section === "quest" && <Quest quests={quests} onComplete={completeQuest} stats={stats} />}
          {section === "connect" && <Connect />}
        </div>

        <BottomNav section={section} onChange={setSection} />

        {modal === "pet" && <AddPetModal onClose={() => setModal(null)} onAdd={addPet} />}
        {modal === "health" && <AddHealthModal onClose={() => setModal(null)} onAdd={addHealthItem} />}
        {notif && <Notification title={notif.title} msg={notif.msg} />}
      </div>
    </div>
  )
}
