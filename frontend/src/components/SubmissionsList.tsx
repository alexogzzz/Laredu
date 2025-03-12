"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface Submission {
  id: number
  assignment_id: number
  user_id: number
  submitted_at: string
  grade: number | null
}

export default function SubmissionsList() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [assignmentId, setAssignmentId] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/submissions", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("No se pudieron cargar las entregas")
        }

        const data = await response.json()
        setSubmissions(data)
      } catch (err: any) {
        setError(err.message || "Error al obtener las entregas")
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage("")
    setError("")

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}")

      if (!user.id) {
        throw new Error("Usuario no identificado")
      }

      const response = await fetch("http://127.0.0.1:8000/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          user_id: user.id,
          assignment_id: Number.parseInt(assignmentId),
          submitted_at: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al entregar tarea")
      }

      const data = await response.json()
      setSubmissions([...submissions, data])
      setMessage("Tarea entregada con éxito")
      setAssignmentId("")
    } catch (err: any) {
      setError(err.message || "Error al entregar tarea")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-center py-4">Cargando entregas...</div>
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Entregas de Tareas</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Nueva Entrega</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="number"
            placeholder="ID de la Tarea"
            className="flex-grow p-2 border border-gray-300 rounded"
            value={assignmentId}
            onChange={(e) => setAssignmentId(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            disabled={submitting}
          >
            {submitting ? "Enviando..." : "Entregar Tarea"}
          </button>
        </div>
      </form>

      {submissions.length === 0 && !error ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No hay entregas disponibles.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tarea ID: {submission.assignment_id}</h3>
              <p className="text-gray-600 mb-1">
                Entregado el: {new Date(submission.submitted_at).toLocaleDateString()}
              </p>
              {submission.grade !== null ? (
                <p className="text-blue-600 font-semibold">Nota: {submission.grade}</p>
              ) : (
                <p className="text-gray-500">Sin calificar</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

