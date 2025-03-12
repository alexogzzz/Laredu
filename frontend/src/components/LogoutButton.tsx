"use client"

interface LogoutProps {
  onLogout: () => void
}

export default function LogoutButton({ onLogout }: LogoutProps) {
  return (
    <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors">
      Cerrar Sesión
    </button>
  )
}

