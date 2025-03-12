"use client"

import { useEffect, useState } from "react"

interface Course {
  id: number
  name: string
  description: string
}

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/courses", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("No se pudieron cargar los cursos")
        }

        const data = await response.json()
        setCourses(data)
      } catch (err: any) {
        setError(err.message || "Error al obtener los cursos")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (loading) {
    return <div className="text-center py-4">Cargando cursos...</div>
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Cursos</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {courses.length === 0 && !error ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No hay cursos disponibles.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.name}</h3>
              <p className="text-gray-600">{course.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

