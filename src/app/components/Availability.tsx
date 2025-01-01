'use client';

import { useState } from 'react';
import axios from 'axios';

const Availability = () => {
    const [date, setDate] = useState('');
    const [slots, setSlots] = useState([]);

    const checkAvailability = async () => {
        const res = await axios.get(`http://localhost:5000/api/availability?date=${date}`);
        setSlots(res.data);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Check Availability</h2>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />
            <button onClick={checkAvailability} className="w-full bg-blue-500 text-white py-2 rounded">
                Check
            </button>
            <ul className="mt-4">
                {slots.map((slot, index) => (
                    <li key={index} className="p-2 border-b">{`Time: ${slot.time}, Name: ${slot.name}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default Availability;
