'use client';

import { useMemo, useState } from 'react';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';
import CalendarActionsBar from './CalendarActionsBar';

// Google Calendar event structure
interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
  location?: string;
}

// Internal calendar event structure
interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  description?: string;
  location?: string;
  color?: string;
}

interface DayEvents {
  [day: number]: CalendarEvent[];
}

const Calendar = () => {
  // ✅ ALL HOOKS AT THE TOP
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // State for current displayed month
  const [displayMonth, setDisplayMonth] = useState(currentMonth);
  const [displayYear, setDisplayYear] = useState(currentYear);

  // React Query hook
  const { data: eventsData, isLoading, isError } = useCalendarEvents();

  // Transform Google Calendar events to our format and organize by day
  const events = useMemo<DayEvents>(() => {
    if (!eventsData || !Array.isArray(eventsData)) return {};

    const eventsByDay: DayEvents = {};
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-purple-100 text-purple-700',
      'bg-green-100 text-green-700',
      'bg-orange-100 text-orange-700',
      'bg-pink-100 text-pink-700',
      'bg-indigo-100 text-indigo-700',
      'bg-teal-100 text-teal-700',
      'bg-red-100 text-red-700',
      'bg-yellow-100 text-yellow-700',
      'bg-cyan-100 text-cyan-700',
    ];

    eventsData.forEach((event: GoogleCalendarEvent, index: number) => {
      // Get the date from the event
      const eventDate = event.start.dateTime || event.start.date;
      if (!eventDate) return;

      const date = new Date(eventDate);
      
      // Only include events from current month and year
      if (date.getMonth() !== currentMonth || date.getFullYear() !== currentYear) {
        return;
      }

      const day = date.getDate();

      // Extract time or use "All day" for date-only events
      let time = 'Todo el día';
      if (event.start.dateTime) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        time = `${hours}:${minutes}`;
      }

      const transformedEvent: CalendarEvent = {
        id: event.id,
        title: event.summary || 'Sin título',
        time: time,
        description: event.description,
        location: event.location,
        color: colors[index % colors.length],
      };

      if (!eventsByDay[day]) {
        eventsByDay[day] = [];
      }
      eventsByDay[day].push(transformedEvent);
    });

    return eventsByDay;
  }, [eventsData, currentMonth, currentYear]);

  // ✅ HANDLE LOADING/ERROR STATES AFTER ALL HOOKS
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
        <div className="text-slate-600">Cargando eventos...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
        <div className="text-red-600">Error al cargar los eventos.</div>
      </div>
    );
  }

  console.log('Fetched Events:', eventsData);
  console.log('Organized Events by Day:', events);
  
  // Spanish day names
  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Get number of days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Get day of week for first day of month (0 = Sunday, adjust to Monday = 0)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Create array of days
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Add empty cells for days before month starts
  const emptyDays = Array.from({ length: adjustedFirstDay }, (_, i) => i);

  // Sort events by time
  const getSortedEvents = (day: number): CalendarEvent[] => {
    const dayEvents = events[day] || [];
    return dayEvents.sort((a, b) => {
      // Handle "All day" events - put them first
      if (a.time === 'Todo el día' && b.time !== 'Todo el día') return -1;
      if (a.time !== 'Todo el día' && b.time === 'Todo el día') return 1;
      if (a.time === 'Todo el día' && b.time === 'Todo el día') return 0;

      // Sort by time
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
    });
  };

  const getMonthName = (month: number): string => {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[month];
  };

  const isToday = (day: number): boolean => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-800 mb-2">
            {getMonthName(currentMonth)} {currentYear}
          </h1>
          <p className="text-slate-500">Tus eventos del mes</p>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
            {dayNames.map((day) => (
              <div
                key={day}
                className="p-4 text-center text-sm font-medium text-slate-600"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7">
            {/* Empty cells for days before month starts */}
            {emptyDays.map((_, index) => (
              <div
                key={`empty-${index}`}
                className="min-h-32 border-b border-r border-slate-200 bg-slate-50"
              />
            ))}

            {/* Actual days */}
            {days.map((day) => {
              const dayEvents = getSortedEvents(day);
              const hasEvents = dayEvents.length > 0;
              
              return (
                <div
                  key={day}
                  className={`min-h-32 border-b border-r border-slate-200 p-2 hover:bg-slate-50 transition-colors ${
                    isToday(day) ? 'bg-blue-50' : 'bg-white'
                  }`}
                >
                  {/* Day number */}
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-lg ${
                        isToday(day)
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-700'
                      }`}
                    >
                      {day}
                    </span>
                    {hasEvents && (
                      <span className="text-xs text-slate-400 mt-1">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>

                  {/* Events list */}
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1.5 rounded ${
                          event.color || 'bg-slate-100 text-slate-700'
                        } hover:shadow-sm transition-shadow cursor-pointer`}
                        title={`${event.title}${event.location ? ` - ${event.location}` : ''}${event.description ? `\n${event.description}` : ''}`}
                      >
                        <div className="font-medium truncate">
                          {event.time}
                        </div>
                        <div className="truncate opacity-90">
                          {event.title}
                        </div>
                        {event.location && (
                          <div className="truncate text-[10px] opacity-70 mt-0.5">
                            📍 {event.location}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span>Día actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-slate-200"></div>
            <span>Evento programado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;