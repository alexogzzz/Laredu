"use client"

import { useEffect, useState } from "react"

interface Subject {
  id: number
  name: string
  course_id: number
}

export default function SubjectsList() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/subjects", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("No se pudieron cargar las asignaturas")
        }

        const data = await response.json()
        setSubjects(data)
      } catch (err: any) {
        setError(err.message || "Error al obtener las asignaturas")
      } finally {
        setLoading(false)
      }
    }

    fetchSubjects()
  }, [])

  if (loading) {
    return <div className="text-center py-4">Cargando asignaturas...</div>
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Asignaturas</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {subjects.length === 0 && !error ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No hay asignaturas disponibles.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <div key={subject.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{subject.name}</h3>
              <p className="text-gray-600">Curso ID: {subject.course_id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

