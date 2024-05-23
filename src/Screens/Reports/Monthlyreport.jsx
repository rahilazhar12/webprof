// import React, { useState, useEffect } from 'react';

// const Attendance = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [staffList, setStaffList] = useState([]);
//   const [selectedStaff, setSelectedStaff] = useState('');

//   useEffect(() => {
//     // Fetch all staff names
//     const fetchStaffNames = async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/staff/get-allstaff`); // Adjust the endpoint as necessary
//         const data = await response.json();
//         setStaffList(data.staff || []);
//       } catch (error) {
//         console.error('Error fetching staff names:', error);
//       }
//     };

//     fetchStaffNames();
//   }, []);

//   const fetchAttendance = async () => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/v1/attendence/attendance/date-range?startDate=${startDate}&endDate=${endDate}`);
//       const data = await response.json();
//       setAttendanceData(data.attendance || []);
//     } catch (error) {
//       console.error('Error fetching attendance:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>
//       <div className="mb-4">
//         <label className="block mb-2">Start Date:</label>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="border p-2 rounded w-full"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">End Date:</label>
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="border p-2 rounded w-full"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Select Staff:</label>
//         <select
//           value={selectedStaff}
//           onChange={(e) => setSelectedStaff(e.target.value)}
//           className="border p-2 rounded w-full"
//         >
//           <option value="">All Staff</option>
//           {staffList && staffList.map((staff) => (
//             <option key={staff._id} value={staff._id}>
//               {staff.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button
//         onClick={fetchAttendance}
//         className="bg-blue-500 text-white p-2 rounded"
//       >
//         Fetch Attendance
//       </button>
//       <div className="mt-4">
//         {attendanceData.length > 0 ? (
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="py-2">Name</th>
//                 <th className="py-2">Present</th>
//                 <th className="py-2">Absent</th>
//                 <th className="py-2">Leave</th>
//                 <th className="py-2">Total Working Hours</th>
//                 <th className="py-2">On Time</th>
//                 <th className="py-2">Late</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceData.map((record) => (
//                 <tr
//                   key={record.staffId}
//                   className={record.staffId === selectedStaff ? 'bg-green-200' : ''}
//                 >
//                   <td className="border px-4 py-2">{record.name}</td>
//                   <td className="border px-4 py-2">{record.present}</td>
//                   <td className="border px-4 py-2">{record.absent}</td>
//                   <td className="border px-4 py-2">{record.leave}</td>
//                   <td className="border px-4 py-2">{record.totalWorkingHours}</td>
//                   <td className="border px-4 py-2">{record.onTime}</td>
//                   <td className="border px-4 py-2">{record.late}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No records found for the selected date range.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Attendance;
