'use client';

import { useState } from 'react';
import axios from 'axios';

// Define types for the form data
type FormDataType = {
    date: string;
    time: string;
    guests: number;
    name: string;
    contact: string;
};

const BookingForm = () => {
    const [formData, setFormData] = useState<FormDataType>({
        date: '',
        time: '',
        guests: 1,
        name: '',
        contact: '',
    });

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'guests' ? parseInt(value, 10) : value, // Ensure guests is a number
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/reserve', formData);
            setSuccessMessage(res.data.message);
            setErrorMessage(null);
        } catch (err) {
            // Handle error type explicitly
            if (axios.isAxiosError(err)) {
                setErrorMessage(err.response?.data?.message || 'An error occurred.');
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
            setSuccessMessage(null);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Reserve a Table</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    min="1"
                    required
                />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Your Name"
                    required
                />
                <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Contact Information"
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Book Now
                </button>
            </form>
            {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
            {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        </div>
    );
};

export default BookingForm;
