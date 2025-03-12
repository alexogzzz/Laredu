"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface Message {
  id: number
  sender_id: number
  receiver_id: number
  content: string
  is_read: boolean
  created_at: string
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([])
  const [receiverId, setReceiverId] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/messages", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("No se pudieron cargar los mensajes")
        }

        const data = await response.json()
        setMessages(data)
      } catch (err: any) {
        setError(err.message || "Error al obtener mensajes")
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setMessage("")
    setError("")

    try {
      const response = await fetch("http://127.0.0.1:8000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          receiver_id: Number.parseInt(receiverId),
          content,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al enviar mensaje")
      }

      const data = await response.json()
      setMessages([...messages, data])
      setMessage("Mensaje enviado con éxito")
      setContent("")
    } catch (err: any) {
      setError(err.message || "Error al enviar mensaje")
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return <div className="text-center py-4">Cargando mensajes...</div>
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Mensajes</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>
      )}

      <form onSubmit={handleSendMessage} className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Nuevo Mensaje</h3>
        <div className="space-y-3">
          <input
            type="number"
            placeholder="ID del Destinatario"
            className="w-full p-2 border border-gray-300 rounded"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            required
          />
          <textarea
            placeholder="Mensaje"
            className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            disabled={sending}
          >
            {sending ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </div>
      </form>

      {messages.length === 0 && !error ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No hay mensajes disponibles.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between mb-2">
                <strong className="text-gray-800">
                  {msg.sender_id === JSON.parse(localStorage.getItem("user") || "{}").id
                    ? "Yo"
                    : `Usuario ${msg.sender_id}`}
                </strong>
                <span className="text-sm text-gray-400">{new Date(msg.created_at).toLocaleString()}</span>
              </div>
              <p className="text-gray-600">{msg.content}</p>
              {!msg.is_read && msg.receiver_id === JSON.parse(localStorage.getItem("user") || "{}").id && (
                <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">No leído</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

