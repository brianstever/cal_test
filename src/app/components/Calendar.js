"use client";

// components/MyCalendar.js
import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventForm from './EventForm';
import ShiftsForm from './ShiftsForm';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState(Views.MONTH); // Default view

  const [showShiftsForm, setShowShiftsForm] = useState(false);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleShiftsSave = (shiftsData) => {
    const newEvents = [];
  
    shiftsData.forEach(shift => {
      const { startDay, endDay, startTime, endTime } = shift;
  
      const startMoment = moment().day(startDay).hour(startTime.split(':')[0]).minute(startTime.split(':')[1]);
      let endMoment = moment().day(endDay).hour(endTime.split(':')[0]).minute(endTime.split(':')[1]);
  
      if (endDay === startDay && endTime < startTime) {
        // Overnight shift, ends next day
        endMoment = endMoment.add(1, 'days');
      } else if (endDay !== startDay) {
        // Shift spans to different weekdays
        const endDayIndex = daysOfWeek.indexOf(endDay);
        const startDayIndex = daysOfWeek.indexOf(startDay);
        const dayDifference = endDayIndex >= startDayIndex ? endDayIndex - startDayIndex : 7 - startDayIndex + endDayIndex;
        endMoment = endMoment.add(dayDifference, 'days');
      }
  
      // Add the shift event
      newEvents.push({
        title: 'Shift',
        start: startMoment.toDate(),
        end: endMoment.toDate(),
        color: 'blue', // Example color for shift event
      });

      // Create Melatonin event (1 hour after shift ends, 30 min duration)
      const melatoninStart = moment(endMoment).add(1, 'hours');
      const melatoninEnd = moment(melatoninStart).add(30, 'minutes');
      newEvents.push({
        title: 'Take Melatonin',
        start: melatoninStart.toDate(),
        end: melatoninEnd.toDate(),
        color: 'purple', // Example color for melatonin event
      });

      // Create Sleep event (3 hours after shift ends, 8 hours duration)
      const sleepStart = moment(endMoment).add(3, 'hours');
      const sleepEnd = moment(sleepStart).add(8, 'hours');
      newEvents.push({
        title: 'Sleep',
        start: sleepStart.toDate(),
        end: sleepEnd.toDate(),
        color: 'green', // Example color for sleep event
      });
    });

    setEvents(newEvents);
    setShowShiftsForm(false);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleEventSave = (updatedEvent) => {
    if (updatedEvent.id) {
      setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    } else {
      setEvents([...events, { ...updatedEvent, id: Math.random() }]); // Assign a random ID for new events
    }
    setSelectedEvent(null);
  };

  const handleEventDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setSelectedEvent(null);
  };

  const handleCloseForm = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <button onClick={() => setShowShiftsForm(true)}>Manage Shifts</button>

      {showShiftsForm && (
        <ShiftsForm
          onSave={handleShiftsSave}
          onClose={() => setShowShiftsForm(false)}
        />
      )}
      {selectedEvent && (
        <EventForm
          event={selectedEvent}
          onSave={handleEventSave}
          onClose={handleCloseForm}
          onDelete={handleEventDelete}
        />
      )}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={(slotInfo) => setSelectedEvent({ start: slotInfo.start, end: slotInfo.end })}
        view={view}
        onView={setView}
        style={{ height: 800 }}
        showMultiDayTimes={true}
      />
    </div>
  );
};

export default MyCalendar;
