import React, { useState, useEffect } from 'react';

const AttendanceTable = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/attendence/attendance/date?date=' + formatDate(new Date()));
            const data = await response.json();
            setAttendanceRecords(data.attendance);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRecords = attendanceRecords.filter(record =>
        record.staffId.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <input
                type="text"
                placeholder="Search by staff name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left">Staff Name</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Late/Ontime</th>
                        <th className="px-4 py-2 text-left">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRecords.map(record => (
                        <tr key={record._id} className={record.timelinessStatus === 'Late' ? 'bg-red-100' : ''}>
                            <td className="px-4 py-2">{record.staffId.name}</td>
                            <td className="px-4 py-2">{record.status}</td>
                            <td className="px-4 py-2">{record.timelinessStatus}</td>
                            <td className="px-4 py-2">{record.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceTable;
