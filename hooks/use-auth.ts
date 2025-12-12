"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const API_URL = "http://52.72.103.241:3000"

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("catpet_user")
    if (saved) {
      setUser(JSON.parse(saved))
      setIsAuth(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password })

      const userData = response.data.user
      const token = response.data.token

      setUser(userData)
      setIsAuth(true)

      localStorage.setItem("catpet_user", JSON.stringify(userData))
      localStorage.setItem("catpet_token", token)

      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (data: any) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, { user: data })

      const userData = response.data.user
      const token = response.data.token

      setUser(userData)
      setIsAuth(true)

      localStorage.setItem("catpet_user", JSON.stringify(userData))
      localStorage.setItem("catpet_token", token)

      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuth(false)
    localStorage.removeItem("catpet_user")
    localStorage.removeItem("catpet_token")
  }

  return { user, isAuth, login, register, logout }
}
