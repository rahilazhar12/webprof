import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const AddReportForm = () => {
    const [date, setDate] = useState('');
    const [report, setReport] = useState('');
    const [message, setMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    const user = sessionStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    const staffId = parsedUser ? parsedUser.id : null;

    useEffect(() => {
        // Set today's date as the default value for the date input
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/report/staff-report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ staffId, date, report }),
        });

        const data = await response.json();
        setMessage(data.message);

        if (response.ok) {
            setDate(new Date().toISOString().split('T')[0]); // Reset to today's date
            setReport('');
            setShowConfetti(true); // Show confetti
            setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
        }
    };

    return (
        <div className="container mx-auto mt-5 p-5">
            <h2 className="mb-4 text-center text-blue-600">Add Report</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                    <input
                        type="date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="report" className="block text-gray-700 text-sm font-bold mb-2">Report</label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="report"
                        rows="3"
                        value={report}
                        onChange={(e) => setReport(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </div>
            </form>
            {message && <div className="mt-4 text-center text-blue-600">{message}</div>}
            {showConfetti && <Confetti />}
        </div>
    );
};

export default AddReportForm;
