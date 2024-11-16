'use client'

import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ChevronLeft, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../app/page'
import * as api from '../services/api'
import { useToast } from '../hooks/use-toast'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [countryCodes] = useState(['+1', '+44', '+91', '+86', '+81'])
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const { login, setUser } = useAuth()
  const { toast } = useToast()

  const toggleForm = () => setIsLogin(!isLogin)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isLogin) {
        const { data } = await api.login({ email: e.target.email.value, password: e.target.password.value })
        login(data)
        setUser(data.user)
      } else {
        await api.register({
          name: `${e.target['first-name'].value} ${e.target['last-name'].value}`,
          email: e.target.email.value,
          password: e.target.password.value,
          username: e.target.username.value,
          phone: `${e.target['country-code'].value}${e.target.phone.value}`
        })
        toast({
          title: "Sign Up Successful",
          description: "You have successfully signed up. Please log in.",
        })
        setIsLogin(true)
      }
    } catch (error) {
      console.error('Auth error:', error)
      toast({
        title: "Error",
        description: error.response?.data?.error || "An error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const passwordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]+/)) strength++
    if (password.match(/[A-Z]+/)) strength++
    if (password.match(/[0-9]+/)) strength++
    if (password.match(/[$@#&!]+/)) strength++
    return strength
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">ShareLinkZ</CardTitle>
            {!isLogin && (
              <Button variant="ghost" size="icon" onClick={toggleForm}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLogin ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="login-id">Username / Email / Phone</Label>
                <Input id="login-id" name="email" placeholder="Enter your username, email, or phone" className="bg-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Input 
                    id="login-password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    className="bg-gray-700 pr-10" 
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button className="w-full" variant="secondary" type="submit">Login</Button>
              <div className="text-center">
                <a href="#" className="text-blue-400 hover:underline">Forgot password?</a>
              </div>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" name="first-name" placeholder="John" className="bg-gray-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" name="last-name" placeholder="Doe" className="bg-gray-700" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="johndoe" className="bg-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" className="bg-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex space-x-2">
                  <Select name="country-code">
                    <SelectTrigger className="w-[110px] bg-gray-700">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((code) => (
                        <SelectItem key={code} value={code}>{code}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input id="phone" name="phone" type="tel" placeholder="123456789" className="flex-1 bg-gray-700" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input 
                    id="signup-password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    className="bg-gray-700 pr-10" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span>Password Strength:</span>
                    <span>{['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][passwordStrength(password)]}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{width: `${(passwordStrength(password) / 5) * 100}%`}}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" name="confirm-password" type="password" className="bg-gray-700" />
              </div>
              <Button className="w-full" variant="secondary" type="submit">Sign Up</Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          {isLogin ? (
            <p className="text-center w-full">
              New to ShareLinkZ? <Button variant="link" className="text-blue-400 p-0" onClick={toggleForm}>Sign Up</Button>
            </p>
          ) : (
            <p className="text-center w-full">
              Already have an account? <Button variant="link" className="text-blue-400 p-0" onClick={toggleForm}>Login</Button>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
