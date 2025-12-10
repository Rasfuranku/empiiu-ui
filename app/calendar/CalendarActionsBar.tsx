'use client';

interface CalendarActionsBarProps {
  currentMonth: number;
  currentYear: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  calendars: { id: string; name: string }[];
  selectedCalendar: string | null;
  onCalendarFilterChange: (calendarId: string | null) => void;
}

const CalendarActionsBar = ({
  currentMonth,
  currentYear,
  onPreviousMonth,
  onNextMonth,
  canGoPrevious,
  canGoNext,
  calendars,
  selectedCalendar,
  onCalendarFilterChange,
}: CalendarActionsBarProps) => {
  const getMonthName = (month: number): string => {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[month];
  };

  return (
    <div className="mb-6">
      {/* Calendar Filter Buttons */}
      {calendars.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-slate-600 mr-2">Filtrar:</span>

          {/* "All" button */}
          <button
            onClick={() => onCalendarFilterChange(null)}
            className={`px-4 py-2 rounded-lg transition-all font-medium text-sm ${selectedCalendar === null
                ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm hover:bg-slate-50'
              }`}
          >
            Todos
          </button>

          {/* Individual calendar buttons */}
          {calendars.slice(0, 3).map((calendar) => (
            <button
              key={calendar.id}
              onClick={() => onCalendarFilterChange(calendar.id)}
              className={`px-4 py-2 rounded-lg transition-all font-medium text-sm truncate max-w-[200px] ${selectedCalendar === calendar.id
                  ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm hover:bg-slate-50'
                }`}
              title={calendar.name}
            >
              {calendar.name}
            </button>
          ))}
        </div>
      )}

      {/* Month Navigation */}
      <div className="flex justify-end items-center gap-3">
        <button
          onClick={onPreviousMonth}
          disabled={!canGoPrevious}
          className={`p-2 rounded-lg transition-all ${canGoPrevious
              ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
          aria-label="Mes anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="min-w-[140px] text-center">
          <span className="text-lg font-semibold text-slate-800">
            {getMonthName(currentMonth)} {currentYear}
          </span>
        </div>

        <button
          onClick={onNextMonth}
          disabled={!canGoNext}
          className={`p-2 rounded-lg transition-all ${canGoNext
              ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
          aria-label="Mes siguiente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CalendarActionsBar;