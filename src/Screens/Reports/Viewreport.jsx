import React, { useState, useEffect } from 'react';

const Viewreport = () => {
  const [staffId, setStaffId] = useState('');
  const [date, setDate] = useState('');
  const [reports, setReports] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/staff/get-allstaff`);
        const data = await response.json();
        setStaffList(data.staff);
      } catch (error) {
        setMessage('Error fetching staff');
      }
    };

    fetchStaff();
  }, []);

  const handleFetchReports = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/report/get-staffreport?staffId=${staffId}&date=${date}`);
      const data = await response.json();
      
      if (response.ok) {
        setReports(data.reports);
        setMessage('');
      } else {
        setReports([]);
        setMessage(data.message);
      }
    } catch (error) {
      setReports([]);
      setMessage('Error fetching reports');
    }
  };

  return (
    <div className="container mx-auto p-4 mt-5 bg-gray-100 rounded-md shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-bold text-blue-600">View Reports</h2>
      {message && <div className="alert alert-info text-center text-red-600">{message}</div>}
      <form onSubmit={handleFetchReports} className="space-y-4">
        <div className="mb-3">
          <label htmlFor="staffId" className="block text-lg font-medium text-gray-700">Staff Name</label>
          <select
            className="form-control w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            id="staffId"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            required
          >
            <option value="">Select Staff</option>
            {staffList.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="block text-lg font-medium text-gray-700">Date</label>
          <input
            type="date"
            className="form-control w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Fetch Reports
        </button>
      </form>
      <div className="mt-5">
        {reports.length > 0 && (
          <div>
            <h3 className="mb-4 text-center text-xl font-semibold text-blue-600">Reports</h3>
            <ul className="space-y-4">
              {reports.map((report) => (
                <li key={report._id} className="p-4 bg-white border border-gray-200 rounded-md shadow-sm">
                  <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
                  <p><strong>Staff Name:</strong> {report.staff.name}</p>
                  {report.tasks && report.tasks.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-gray-700">Tasks</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 table-auto">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Time</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {report.tasks.map((task, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(task.startTime).toLocaleTimeString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(task.endTime).toLocaleTimeString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{task.totalTime}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewreport;
