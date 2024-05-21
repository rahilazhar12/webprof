import React, { useState, useEffect } from 'react';

const MarkAttendance = () => {
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Present');
  const [type, setType] = useState('check-in'); // Added state for type
  const [message, setMessage] = useState('');
  const [clientIP, setClientIP] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const user = sessionStorage.getItem('user');
  const parsedUser = user ? JSON.parse(user) : null;
  const staffId = parsedUser ? parsedUser.id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/attendence/mark-attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': clientIP
      },
      body: JSON.stringify({ staffId, date, status, type }), // Added type to request body
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } else {
      setMessage(`Error: ${data.message}`);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  async function getClientIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setClientIP(data.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  }

  useEffect(() => {
    // Set today's date
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
    getClientIP();

    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Mark Attendance</h2>
        <input
          type="date"
          value={date}
          className="w-full p-2 border border-gray-300 rounded mb-4 bg-gray-200 text-center cursor-not-allowed"
          required
          disabled
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="Present">Present</option>
          <option value="Leave">Leave</option>
          <option value="Absent">Absent</option>
        </select>
        <div className="mb-4 flex justify-around">
          <label className={`mr-4 px-4 py-2 rounded cursor-pointer ${type === 'check-in' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            <input
              type="radio"
              value="check-in"
              checked={type === 'check-in'}
              onChange={(e) => setType(e.target.value)}
              className="hidden"
            />
            Check-in
          </label>
          <label className={`px-4 py-2 rounded cursor-pointer ${type === 'check-out' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            <input
              type="radio"
              value="check-out"
              checked={type === 'check-out'}
              onChange={(e) => setType(e.target.value)}
              className="hidden"
            />
            Check-out
          </label>
        </div>
        <div className="text-center mb-4">
          <span className="text-lg font-mono">{currentTime.toLocaleTimeString()}</span>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Submit
        </button>
        {message && <div className="mt-4 text-center text-lg">{message}</div>}
      </form>
    </div>
  );
};

export default MarkAttendance;
