import { Calendar } from 'react-big-calendar'
import type { Event } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../calendar.css'
import { calendarLocalizer } from '../utils/calendarLocalizer'
import CalendarDayHeader from './CalendarDayHeader'

const NO_EVENTS: Event[] = []
const COMPONENTS = { month: { dateHeader: CalendarDayHeader } }
const MESSAGES = { today: 'Hoy', previous: 'Anterior', next: 'Siguiente', month: 'Mes' }

export default function CalendarGrid() {
  return (
    <div className="h-136">
      <Calendar
        localizer={calendarLocalizer}
        culture="es"
        events={NO_EVENTS}
        views={['month']}
        defaultView="month"
        components={COMPONENTS}
        messages={MESSAGES}
      />
    </div>
  )
}