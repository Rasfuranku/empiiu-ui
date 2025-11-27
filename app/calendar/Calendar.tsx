'use client';

import { useState } from 'react';

// Sample event data structure
interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  color?: string;
}

interface DayEvents {
  [day: number]: CalendarEvent[];
}

const Calendar = () => {
  // Get current date info
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Spanish day names
  const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  
  // Sample events data
  const [events] = useState<DayEvents>({
    5: [
      { id: '1', title: 'Reunión de equipo', time: '09:00', color: 'bg-blue-100 text-blue-700' },
      { id: '2', title: 'Presentación cliente', time: '14:30', color: 'bg-purple-100 text-purple-700' },
      { id: '3', title: 'Revisión proyecto', time: '16:00', color: 'bg-green-100 text-green-700' }
    ],
    12: [
      { id: '4', title: 'Workshop diseño', time: '10:00', color: 'bg-orange-100 text-orange-700' },
      { id: '5', title: 'Llamada con proveedor', time: '15:00', color: 'bg-pink-100 text-pink-700' }
    ],
    18: [
      { id: '6', title: 'Demo producto', time: '11:00', color: 'bg-indigo-100 text-indigo-700' }
    ],
    25: [
      { id: '7', title: 'Cierre mensual', time: '09:30', color: 'bg-red-100 text-red-700' },
      { id: '8', title: 'Planificación Q1', time: '13:00', color: 'bg-teal-100 text-teal-700' },
      { id: '9', title: 'Team building', time: '17:00', color: 'bg-yellow-100 text-yellow-700' },
      { id: '10', title: 'Retrospectiva', time: '18:30', color: 'bg-cyan-100 text-cyan-700' }
    ]
  });

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
                      >
                        <div className="font-medium truncate">
                          {event.time}
                        </div>
                        <div className="truncate opacity-90">
                          {event.title}
                        </div>
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