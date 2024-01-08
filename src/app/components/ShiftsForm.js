// components/ShiftsForm.js
import React, { useState } from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ShiftsForm = ({ onSave, onClose }) => {
  const [shifts, setShifts] = useState([{ startDay: '', endDay: '', startTime: '', endTime: '' }]);

  const handleShiftChange = (index, field, value) => {
    const newShifts = shifts.map((shift, shiftIndex) => (
      index === shiftIndex ? { ...shift, [field]: value } : shift
    ));
    setShifts(newShifts);
  };

  const addShift = () => {
    setShifts([...shifts, { startDay: '', endDay: '', startTime: '', endTime: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(shifts);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-10">
      <div className="bg-white rounded-lg p-8 m-4 max-w-xl w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          {shifts.map((shift, index) => (
            <div key={index} className="space-y-2">
              {/* Shift Inputs */}
              <div className="flex space-x-2">
                <select
                  value={shift.startDay}
                  onChange={(e) => handleShiftChange(index, 'startDay', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">Start Day</option>
                  {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
                <input
                  type="time"
                  value={shift.startTime}
                  onChange={(e) => handleShiftChange(index, 'startTime', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="flex space-x-2">
                <select
                  value={shift.endDay}
                  onChange={(e) => handleShiftChange(index, 'endDay', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">End Day</option>
                  {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
                <input
                  type="time"
                  value={shift.endTime}
                  onChange={(e) => handleShiftChange(index, 'endTime', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>
          ))}
          <div>
            <button type="button" onClick={addShift} className="px-4 py-2 text-gray-500 rounded hover:text-gray-200">
              <p>+</p>
            </button>
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Save Shifts
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShiftsForm;
