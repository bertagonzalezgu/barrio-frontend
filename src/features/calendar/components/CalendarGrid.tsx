import { Calendar } from 'react-big-calendar'
import type { Event } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../calendar.css'
import { calendarLocalizer } from '../utils/calendarLocalizer'
import CalendarDayHeader from './CalendarDayHeader'
import CalendarToolbar from './CalendarToolbar'

const NO_EVENTS: Event[] = []
const COMPONENTS = { toolbar: CalendarToolbar, month: { dateHeader: CalendarDayHeader } }
const FORMATS = { weekdayFormat: 'EEEEEE' }

export default function CalendarGrid() {
  return (
    <div className="h-120">
      <Calendar
        localizer={calendarLocalizer}
        culture="es"
        events={NO_EVENTS}
        views={['month']}
        defaultView="month"
        components={COMPONENTS}
        formats={FORMATS}
      />
    </div>
  )
}