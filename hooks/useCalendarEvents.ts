import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../constants/constants';

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
  location?: string;
}

async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  const response = await fetch(`${API_URL}/calendar`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
}

export function useCalendarEvents() {
  return useQuery({
    queryKey: ['calendar-events'],
    queryFn: fetchCalendarEvents,
  });
}