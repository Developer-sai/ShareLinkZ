// frontend/components/ToastProvider.js
'use client'

import { Toaster } from './ui/toast'
import { useToast } from '../hooks/use-toast'

export function ToastProvider({ children }) {
  const { toasts, toast } = useToast()

  return (
    <>
      {children}
      <Toaster toasts={toasts} onDismiss={(id) => toast((prev) => prev.filter((t) => t.id !== id))} />
    </>
  )
}
