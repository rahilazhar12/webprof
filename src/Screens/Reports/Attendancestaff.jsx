import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AttendanceTable = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        fetchAttendance();
    }, [selectedDate]);

    const fetchAttendance = async () => {
        setLoading(true); // Set loading to true before making the fetch request
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/attendence/attendance/date?date=` + formatDate(selectedDate));
            const data = await response.json();
            setAttendanceRecords(data.attendance);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        } finally {
            setLoading(false); // Set loading to false after the fetch request is complete (whether successful or not)
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

    const downloadPDF = () => {
        const input = document.getElementById('attendance-table');
        html2canvas(input, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');

            // Add watermark with today's date
            const watermarkText = `Generated on ${formatDate(new Date())}`;
            pdf.setFontSize(30);
            pdf.setTextColor(150, 150, 150);

            // Calculate the center position for the watermark
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const textWidth = pdf.getStringUnitWidth(watermarkText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
            const textHeight = pdf.internal.getFontSize() / pdf.internal.scaleFactor;
            const x = (pageWidth - textWidth) / 2;
            const y = (pageHeight - textHeight) / 2;

            pdf.text(watermarkText, x, y, {
                angle: 45
            });

            pdf.save(`attendance-report-${formatDate(new Date())}.pdf`);
        });
    };

    console.log(attendanceRecords , 'attendance record')

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-2 md:flex-row items-center mb-4">
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Search by staff name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full max-w-md px-4 py-2 ml-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={downloadPDF}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
                >
                    Download PDF
                </button>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="loader">
                        <span className="loader-text">WS</span>
                    </div>
                </div>
            ) : (
                <div id="attendance-table" className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Staff Name</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Late/Ontime</th>
                                <th className="px-4 py-2 text-left">Check-In</th>
                                <th className="px-4 py-2 text-left">Check-Out</th>
                                <th className="px-4 py-2 text-left">Total working Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map(record => (
                                <tr key={record._id} className={record.timelinessStatus === 'Late' ? 'bg-red-100' : ''}>
                                    <td className="px-4 py-2">{record.staffId.name}</td>
                                    <td className={`px-4 py-2 ${record.status === 'Absent' ? 'bg-yellow-200' : ''}`}>{record.status}</td>
                                    <td className="px-4 py-2">{record.timelinessStatus}</td>
                                    <td className="px-4 py-2">{record.checkInTime}</td>
                                    <td className="px-4 py-2">{record.checkOutTime}</td>
                                    <td className="px-4 py-2">{record.totalWorkingHours}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AttendanceTable;
