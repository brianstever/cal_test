// components/EventForm.js
import React, { useState } from 'react';

const toLocalISOString = (date) => {
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
  return adjustedDate.toISOString().slice(0, 16);
};

const EventForm = ({ event = {}, onSave, onClose, onDelete }) => {
    const [title, setTitle] = useState(event.title || '');
    const [description, setDescription] = useState(event.description || '');
    const [start, setStart] = useState(event.start ? new Date(event.start) : new Date());
    const [end, setEnd] = useState(event.end ? new Date(event.end) : new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...event, title, description, start, end });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <form onSubmit={handleSubmit}>
                    {/* ... title and description inputs ... */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="start" className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
                        <input
                            type="datetime-local"
                            id="start"
                            value={toLocalISOString(start)}
                            onChange={(e) => setStart(new Date(e.target.value))}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="end" className="block text-gray-700 text-sm font-bold mb-2">End Time</label>
                        <input
                            type="datetime-local"
                            id="end"
                            value={toLocalISOString(end)}
                            onChange={(e) => setEnd(new Date(e.target.value))}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">

                        {/* ... Save button ... */}
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Save
                        </button>

                        {/* ... Delete button ... */}
                        {event.id && (
                            <button
                                type="button"
                                onClick={() => onDelete(event.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Delete
                            </button>
                        )}

                        {/* ... Cancel button ... */}
                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventForm;
