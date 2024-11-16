// frontend/components/ui/toast.js
'use client'

import { useEffect, useState } from 'react'

export function Toast({ toast, onDismiss }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onDismiss, 300) // Allow time for fade-out animation
    }, toast.duration)

    return () => clearTimeout(timer)
  }, [toast, onDismiss])

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${
        toast.variant === 'destructive' ? 'bg-red-600 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {toast.title && <h3 className="font-semibold">{toast.title}</h3>}
      <p>{toast.description}</p>
    </div>
  )
}

export function Toaster({ toasts, onDismiss }) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </div>
  )
}
