"use client"

import { useEffect, useState } from "react"

interface Assignment {
  id: number
  title: string
  description: string
  due_date: string
  subject_id: number
}

export default function AssignmentsList() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/assignments", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("No se pudieron cargar las tareas")
        }

        const data = await response.json()
        setAssignments(data)
      } catch (err: any) {
        setError(err.message || "Error al obtener las tareas")
      } finally {
        setLoading(false)
      }
    }

    fetchAssignments()
  }, [])

  if (loading) {
    return <div className="text-center py-4">Cargando tareas...</div>
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Tareas</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {assignments.length === 0 && !error ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No hay tareas disponibles.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{assignment.title}</h3>
              <p className="text-gray-600 mb-2">{assignment.description}</p>
              <p className="text-sm text-blue-600">
                Fecha de entrega: {new Date(assignment.due_date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

