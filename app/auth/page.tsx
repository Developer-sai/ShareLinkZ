'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft } from 'lucide-react'

export default function AuthPage() {
  const [authState, setAuthState] = useState<'login' | 'signup' | 'forgot' | 'otp' | 'reset'>('login')
  const [otpMethod, setOtpMethod] = useState<'email' | 'phone'>('email')
  const [countryCodes] = useState(['+1', '+44', '+91', '+86', '+81'])

  const goToLogin = () => setAuthState('login')
  const goToSignup = () => setAuthState('signup')
  const goToForgot = () => setAuthState('forgot')
  const goToOTP = () => setAuthState('otp')
  const goToReset = () => setAuthState('reset')

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">ShareLinkZ</CardTitle>
            {authState !== 'login' && (
              <Button variant="ghost" size="icon" onClick={goToLogin} aria-label="Go back to login">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {authState === 'login' && (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="login-id">Username / Email / Phone</Label>
                <Input id="login-id" placeholder="Enter your username, email, or phone" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" />
              </div>
              <Button className="w-full" type="submit">Login</Button>
              <div className="text-center">
                <Button variant="link" onClick={goToForgot}>Forgot password?</Button>
              </div>
            </form>
          )}

          {authState === 'signup' && (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="johndoe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((code) => (
                        <SelectItem key={code} value={code}>{code}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input id="phone" type="tel" placeholder="123456789" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="w-full" type="submit">Sign Up</Button>
            </form>
          )}

          {authState === 'forgot' && (
            <div className="space-y-4">
              <p className="text-center">Select how you want to reset your password:</p>
              <Tabs defaultValue="email" onValueChange={(value) => setOtpMethod(value as 'email' | 'phone')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <Input id="reset-email" type="email" placeholder="Enter your email" />
                    </div>
                    <Button className="w-full" onClick={goToOTP}>Send OTP</Button>
                  </form>
                </TabsContent>
                <TabsContent value="phone">
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <Label htmlFor="reset-phone">Phone Number</Label>
                      <div className="flex space-x-2">
                        <Select>
                          <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((code) => (
                              <SelectItem key={code} value={code}>{code}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input id="reset-phone" type="tel" placeholder="Enter your phone number" className="flex-1" />
                      </div>
                    </div>
                    <Button className="w-full" onClick={goToOTP}>Send OTP</Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {authState === 'otp' && (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input id="otp" placeholder="Enter the OTP sent to your email/phone" />
              </div>
              <Button className="w-full" onClick={goToReset}>Verify OTP</Button>
              <div className="text-center">
                <Button variant="link" onClick={goToForgot}>Resend OTP</Button>
              </div>
            </form>
          )}

          {authState === 'reset' && (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                <Input id="confirm-new-password" type="password" />
              </div>
              <Button className="w-full" onClick={goToLogin}>Reset Password</Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          {authState === 'login' && (
            <p className="text-center w-full">
              New to ShareLinkZ? <Button variant="link" onClick={goToSignup}>Sign Up</Button>
            </p>
          )}
          {authState === 'signup' && (
            <p className="text-center w-full">
              Already have an account? <Button variant="link" onClick={goToLogin}>Login</Button>
            </p>
          )}
          {(authState === 'forgot' || authState === 'otp' || authState === 'reset') && (
            <p className="text-center w-full">
              Remember your password? <Button variant="link" onClick={goToLogin}>Login</Button>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

