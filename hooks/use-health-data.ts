"use client"

import { useState, useCallback } from "react"
import axios from "axios"

const API_URL = "http://52.72.103.241:3000"

export function useHealthData() {
  const [alimentacoes, setAlimentacoes] = useState<any[]>([])
  const [registros, setRegistros] = useState<any[]>([])
  const [consultas, setConsultas] = useState<any[]>([])

  const getAuthHeaders = () => {
    const token = localStorage.getItem("catpet_token")
    return { Authorization: `Bearer ${token}` }
  }

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem("catpet_user") || "{}")
    return user.id
  }

  const fetchAlimentacoes = useCallback(async () => {
    try {
      const userId = getUserId()
      if (!userId) return

      const cached = localStorage.getItem("catpet_alimentacoes")
      if (cached) setAlimentacoes(JSON.parse(cached))

      const response = await axios.get(`${API_URL}/users/${userId}/alimentacoes`, { headers: getAuthHeaders() })

      setAlimentacoes(response.data)
      localStorage.setItem("catpet_alimentacoes", JSON.stringify(response.data))
    } catch (error) {
      console.error("Error fetching alimentações:", error)
    }
  }, [])

  const fetchRegistros = useCallback(async () => {
    try {
      const userId = getUserId()
      if (!userId) return

      const cached = localStorage.getItem("catpet_registros")
      if (cached) setRegistros(JSON.parse(cached))

      const response = await axios.get(`${API_URL}/users/${userId}/registros`, { headers: getAuthHeaders() })

      setRegistros(response.data)
      localStorage.setItem("catpet_registros", JSON.stringify(response.data))
    } catch (error) {
      console.error("Error fetching registros:", error)
    }
  }, [])

  const fetchConsultas = useCallback(async () => {
    try {
      const userId = getUserId()
      if (!userId) return

      const cached = localStorage.getItem("catpet_consultas")
      if (cached) setConsultas(JSON.parse(cached))

      const response = await axios.get(`${API_URL}/users/${userId}/consultas`, { headers: getAuthHeaders() })

      setConsultas(response.data)
      localStorage.setItem("catpet_consultas", JSON.stringify(response.data))
    } catch (error) {
      console.error("Error fetching consultas:", error)
    }
  }, [])

  const addHealthItem = async (item: any) => {
    try {
      const userId = getUserId()
      const token = localStorage.getItem("catpet_token")

      if (!userId || !token) {
        throw new Error("Usuário não autenticado")
      }

      let dataToSend: any
      let contentType = {}

      if (item.category === "registros") {
        dataToSend = new FormData()
        dataToSend.append("title", item.title)
        dataToSend.append("description", item.description)
        item.photos.forEach((file: any) => {
          dataToSend.append(`photos[]`, file)
        })
        contentType = { "Content-Type": "multipart/form-data" }
      } else {
        dataToSend = {
          title: item.title,
          description: item.description,
        }
      }

      const endpoints: Record<string, string> = {
        alimentacao: `/users/${userId}/alimentacoes`,
        registros: `/users/${userId}/registros`,
        consultas: `/users/${userId}/consultas`,
      }
      if (item.category == "alimentacao") {
        await axios.post(`${API_URL}${endpoints[item.category]}`, { "body": dataToSend }, {
          headers: {
            Authorization: `Bearer ${token}`,
            ...contentType,
          },
        })
      }
      else {
        await axios.post(`${API_URL}${endpoints[item.category]}`, dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            ...contentType,
          },
        })
      }


      // Refresh data
      if (item.category === "alimentacao") fetchAlimentacoes()
      if (item.category === "registros") fetchRegistros()
      if (item.category === "consultas") fetchConsultas()
    } catch (error: any) {
      console.error("Error adding health item:", error)
      throw error
    }
  }

  return {
    alimentacoes,
    registros,
    consultas,
    fetchAlimentacoes,
    fetchRegistros,
    fetchConsultas,
    addHealthItem,
  }
}
