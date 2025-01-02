'use client';

import { useState } from 'react';
import axios from 'axios';

// Define the type for each slot
type Slot = {
    time: string; // Represents the time of the slot
    name: string; // Represents the name associated with the slot
};

const Availability = () => {
    const [date, setDate] = useState<string>(''); // State for the selected date
    const [slots, setSlots] = useState<Slot[]>([]); // State for available slots with type `Slot[]`

    // Function to check availability
    const checkAvailability = async () => {
        try {
            const res = await axios.get<{ time: string; name: string }[]>(
                `http://localhost:5000/api/availability?date=${date}`
            );
            setSlots(res.data); // Update slots state with API response
        } catch (error) {
            console.error('Error fetching availability:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Check Availability</h2>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)} // Update date state
                className="w-full p-2 border rounded mb-4"
            />
            <button
                onClick={checkAvailability}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Check
            </button>
            <ul className="mt-4">
                {slots.map((slot, index) => (
                    <li
                        key={index}
                        className="p-2 border-b"
                    >{`Time: ${slot.time}, Name: ${slot.name}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default Availability;
