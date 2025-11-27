'use client';

interface CalendarActionsBarProps {
  currentMonth: number;
  currentYear: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

const CalendarActionsBar = ({
  currentMonth,
  currentYear,
  onPreviousMonth,
  onNextMonth,
  canGoPrevious,
  canGoNext,
}: CalendarActionsBarProps) => {
  const getMonthName = (month: number): string => {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[month];
  };

  return (
    <div className="flex justify-end items-center gap-3 mb-6">
      <button
        onClick={onPreviousMonth}
        disabled={!canGoPrevious}
        className={`p-2 rounded-lg transition-all ${
          canGoPrevious
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
        className={`p-2 rounded-lg transition-all ${
          canGoNext
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
  );
};

export default CalendarActionsBar;