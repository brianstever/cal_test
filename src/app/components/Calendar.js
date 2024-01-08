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
  
      // Convert day names to moment.js day indices
      const startDayIndex = daysOfWeek.indexOf(startDay);
      let startMoment = moment().day(startDayIndex).hour(startTime.split(':')[0]).minute(startTime.split(':')[1]);
  
      const endDayIndex = daysOfWeek.indexOf(endDay);
      let endMoment = moment().day(endDayIndex).hour(endTime.split(':')[0]).minute(endTime.split(':')[1]);
  
      // If the end day is earlier in the week than the start day, add a week to the end moment
      if (endDayIndex < startDayIndex) {
        endMoment.add(1, 'week');
      }
  
      // If the end time is earlier than the start time, and the days are the same, add a day to the end moment
      if (endDayIndex === startDayIndex && endMoment.isBefore(startMoment)) {
        endMoment.add(1, 'day');
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

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
      backgroundColor: '',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };

    if (event.title === 'Shift') {
      style.backgroundColor = 'blue';
    } else if (event.title === 'Take Melatonin') {
      style.backgroundColor = 'purple';
    } else if (event.title === 'Sleep') {
      style.backgroundColor = 'green';
    }

    return {
      style: style
    };
  };

  return (
    <div>
      <button className='bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-md mt-4 mb-16' onClick={() => setShowShiftsForm(true)}>Manage Shifts</button>

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
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default MyCalendar;
