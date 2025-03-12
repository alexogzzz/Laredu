<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use Illuminate\Http\Request;

class CalendarEventController extends Controller
{
    /**
     * Get all calendar events (Obtener todos los eventos).
     */
    public function index()
    {
        return response()->json(CalendarEvent::all(), 200);
    }
    /**
     * Create a new calendar event (Crear un nuevo evento).
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start',
            'user_id' => 'required|exists:users,id',
        ]);
        $event = CalendarEvent::create($request->all());
        return response()->json([
            'message' => 'Event created successfully',
            'event' => $event
        ], 201);
    }
    /**
     * Show a specific event (Mostrar evento).
     */
    public function show($id)
    {
        $event = CalendarEvent::find($id);
        if (!$event) {
            return response()->json(
                ['message' => 'Event not found'],
                404
            );
        }
        return response()->json($event, 200);
    }
    /**
     * Update an event (Actualizar evento).
     */
    public function update(Request $request, $id)
    {
        $event = CalendarEvent::find($id);
        if (!$event) {
            return response()->json(
                ['message' => 'Event not found'],
                404
            );
        }
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'start' => 'nullable|date',
            'end' => 'nullable|date|after_or_equal:start',
        ]);
        $event->update($request->all());
        return response()->json([
            'message' => 'Event updated successfully',
            'event' => $event
        ], 200);
    }
    /**
     * Delete an event (Eliminar evento).
     */
    public function destroy($id)
    {
        $event = CalendarEvent::find($id);
        if (!$event) {
            return response()->json(
                ['message' => 'Event not found'],
                404
            );
        }
        $event->delete();
        return response()->json(['message' => 'Event deleted
    successfully'], 200);
    }
}
