import { Link } from "react-router-dom"
import LogoutButton from "./LogoutButton"

interface NavbarProps {
  onLogout: () => void
}

export default function Navbar({ onLogout }: NavbarProps) {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">
          📚 Laredu
        </Link>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4 md:mb-0">
          <Link to="/" className="px-3 py-2 hover:bg-blue-700 rounded">
            Inicio
          </Link>
          <Link to="/courses" className="px-3 py-2 hover:bg-blue-700 rounded">
            Cursos
          </Link>
          <Link to="/subjects" className="px-3 py-2 hover:bg-blue-700 rounded">
            Asignaturas
          </Link>
          <Link to="/assignments" className="px-3 py-2 hover:bg-blue-700 rounded">
            Tareas
          </Link>
          <Link to="/submissions" className="px-3 py-2 hover:bg-blue-700 rounded">
            Entregas
          </Link>
          <Link to="/messages" className="px-3 py-2 hover:bg-blue-700 rounded">
            Mensajes
          </Link>
        </div>

        <LogoutButton onLogout={onLogout} />
      </div>
    </nav>
  )
}

