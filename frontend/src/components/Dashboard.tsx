import { Link } from "react-router-dom"

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Bienvenido, {user.name || "Usuario"}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/courses" className="bg-white p-6 rounded shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Cursos</h2>
          <p className="text-gray-600">Administra tus cursos y explora contenido nuevo.</p>
        </Link>

        <Link to="/subjects" className="bg-white p-6 rounded shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Asignaturas</h2>
          <p className="text-gray-600">Consulta las asignaturas disponibles y su contenido.</p>
        </Link>

        <Link to="/assignments" className="bg-white p-6 rounded shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Tareas</h2>
          <p className="text-gray-600">Gestiona tus tareas pendientes y completadas.</p>
        </Link>

        <Link to="/submissions" className="bg-white p-6 rounded shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Entregas</h2>
          <p className="text-gray-600">Revisa y sube entregas de tus actividades.</p>
        </Link>

        <Link to="/messages" className="bg-white p-6 rounded shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Mensajes</h2>
          <p className="text-gray-600">Consulta y responde mensajes de profesores.</p>
        </Link>
      </div>
    </div>
  )
}

