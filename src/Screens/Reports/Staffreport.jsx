import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { FaPlusCircle, FaTrashAlt, FaCalendarAlt, FaRegClock, FaTasks } from 'react-icons/fa';

const AddReportForm = () => {
    const [date, setDate] = useState('');
    const [tasks, setTasks] = useState([{ description: '', startTime: '', endTime: '' }]);
    const [message, setMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);

    const user = sessionStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    const staffId = parsedUser ? parsedUser.id : null;

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    }, []);

    const handleTaskChange = (index, field, value) => {
        const newTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, [field]: value };
            }
            return task;
        });
        setTasks(newTasks);
    };

    const addTask = () => {
        setTasks([...tasks, { description: '', startTime: '', endTime: '' }]);
    };

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const today = new Date().toISOString().split('T')[0];

        const tasksWithFullDateTime = tasks.map(task => {
            const startDateTime = `${today}T${task.startTime}`;
            const endDateTime = `${today}T${task.endTime}`;
            return {
                ...task,
                startTime: startDateTime,
                endTime: endDateTime
            };
        });

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/report/staff-report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ staffId, date, tasks: tasksWithFullDateTime }),
        });

        const data = await response.json();
        setMessage(data.message);

        if (response.ok) {
            setDate(new Date().toISOString().split('T')[0]);
            setTasks([{ description: '', startTime: '', endTime: '' }]);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
        }
    };

    const today = new Date().toISOString().split('T')[0]
    console.log(today)

    return (
        <div className="container mx-auto mt-5 p-5 max-w-2xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-blue-600">Add Report</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                        <FaCalendarAlt className="inline mr-2" /> Date
                    </label>
                    <input
                        type="date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        disabled
                    />
                </div>

                {tasks.map((task, index) => (
                    <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
                        <div className="mb-2">
                            <label htmlFor={`description-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
                                <FaTasks className="inline mr-2" /> Task Description
                            </label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id={`description-${index}`}
                                value={task.description}
                                onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor={`startTime-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
                                <FaRegClock className="inline mr-2" /> Start Time
                            </label>
                            <input
                                type="time"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id={`startTime-${index}`}
                                value={task.startTime}
                                onChange={(e) => handleTaskChange(index, 'startTime', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor={`endTime-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
                                <FaRegClock className="inline mr-2" /> End Time
                            </label>
                            <input
                                type="time"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id={`endTime-${index}`}
                                value={task.endTime}
                                onChange={(e) => handleTaskChange(index, 'endTime', e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeTask(index)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            <FaTrashAlt className="inline mr-2" /> Remove Task
                        </button>
                    </div>
                ))}
                <div className="flex items-center justify-center mb-4">
                    <button
                        type="button"
                        onClick={addTask}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        <FaPlusCircle className="inline mr-2" /> Add Task
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {message && <div className="mt-4 text-center text-black bg-blue-400 p-2 rounded">{message}</div>}
            {showConfetti && <Confetti />}
        </div>
    );
};

export default AddReportForm;
