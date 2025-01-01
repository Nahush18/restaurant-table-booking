'use client';

import { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: 1,
        name: '',
        contact: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/reserve', formData);
            setMessage(res.data.message);
        } catch (err: any) {
            setMessage(err.response.data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Reserve a Table</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    placeholder='Enter name'
                    required
                />
                <input
                    type="number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    placeholder='Enter contact number'
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                    Book Now
                </button>
            </form>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
    );
};

export default BookingForm;
