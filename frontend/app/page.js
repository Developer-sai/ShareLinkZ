'use client'

import { createContext, useState, useContext, useEffect } from 'react'
import AuthPage from '../components/auth-page'
import HomePage from '../components/home-page'
import * as api from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.default.defaults.headers.common['Authorization'] = `Bearer ${token}`
      api.verifyToken()
        .then(response => {
          setUser(response.data.user)
        })
        .catch(error => {
          console.error('Token verification failed:', error)
          localStorage.removeItem('token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (credentials) => {
    try {
      const { data } = await api.login(credentials)
      localStorage.setItem('token', data.token)
      api.default.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      setUser(data.user)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.default.defaults.headers.common['Authorization']
    setUser(null)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {user ? <HomePage /> : <AuthPage />}
    </AuthContext.Provider>
  )
}