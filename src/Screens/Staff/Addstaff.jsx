import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from '@iconify/react';

const AddStaff = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        role: '',
        address: '',
        birthday: '',
        emergency: '',
        CNIC: '',
        bloodgroup: '',
        otherinformation: '',
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) { // Check if file size is greater than 2MB
            toast.error('File size should not exceed 2MB', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setProfilePicture(null);
        } else {
            setProfilePicture(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });
        formDataToSend.append('profilePicture', profilePicture);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/staff/staff-register`, {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();
            handleResponse(data);
        } catch (error) {
            console.error("Error:", error);
            toast.error('Connection Error', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const handleResponse = (response) => {
        if (response.message === "Email Already Exists") {
            toast.warning('Email Already Exist', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (response.message === "Staff Saved Successfully") {
            toast.success('Staff saved successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setFormData({
                name: '',
                email: '',
                password: '',
                mobile: '',
                role: '',
                address: '',
                birthday: '',
                emergency: '',
                CNIC: '',
                bloodgroup: '',
                otherinformation: '',
                active: true
            });
            setProfilePicture(null);
        } else if (response.message === "You are not an admin / unauthorized access") {
            toast.error('You are Not admin', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (response.message === "all fields are required") {
            toast.info('Fill Required Fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (response.message === "Mobile Number Already Exists") {
            toast.warning('Mobile Number Already Exist', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error('Connection Error', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const validateCNIC = (value) => {
        const regex = new RegExp('^[0-9]{1,13}$');
        if (!regex.test(value)) {
            setError(true);
        } else {
            setError(false);
        }
        setFormData({ ...formData, CNIC: value });
    };

    return (
        <>
            <div className="container mx-auto mt-10">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <div className="flex justify-center items-center gap-4 flex-col mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Add Staff</h1>
          <Icon icon="guidance:care-staff-area" width={50} />
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className='text-gray-700 mb-1'>Name <span className='text-red-500'>*</span></label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="flex flex-col">
            <label className='text-gray-700 mb-1'>Email <span className='text-red-500'>*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="flex flex-col">
            <label className='text-gray-700 mb-1'>Password <span className='text-red-500'>*</span></label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="flex flex-col">
            <label className='text-gray-700 mb-1'>Mobile <span className='text-red-500'>*</span></label>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter Mobile Number" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="flex flex-col">
            <label className='text-gray-700 mb-1'>Role <span className='text-red-500'>*</span></label>
            <select name="role" value={formData.role} onChange={handleChange} className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="">-Select-</option>
              <option value="Video Editor">Video Editor</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Admission Officer">Admission Officer</option>
              <option value="Sales Representative">Sales Representative</option>
              <option value="Brand Strategist">Brand Strategist</option>
              <option value="Web Developer">Web Developer</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className='text-gray-700 mb-1'>Address <span className='text-red-500'>*</span></label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="flex flex-col">
            <label className='text-gray-700 mb-1'>Birthday</label>
            <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} placeholder="Select Birthday" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label className='text-gray-700 mb-1'>Emergency Number <span className='text-red-500'>*</span></label>
            <input type="tel" name="emergency" value={formData.emergency} onChange={handleChange} placeholder="Enter Emergency Number" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="flex flex-col">
            <label className='text-gray-700 mb-1'>CNIC <span className='text-red-500'>*</span></label>
            <input type="number" name="CNIC" value={formData.CNIC} onChange={(e) => validateCNIC(e.target.value)} placeholder="Enter CNIC" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            {error && <span className="text-red-500">Please enter a valid 13-digit CNIC without -</span>}
          </div>
          <div className="flex flex-col">
            <label className='text-gray-700 mb-1'>Blood Group</label>
            <input type="text" name="bloodgroup" value={formData.bloodgroup} onChange={handleChange} placeholder="Enter Blood Group" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col">
            <label className='text-gray-700 mb-1'>Other Information</label>
            <input type="text" name="otherinformation" value={formData.otherinformation} onChange={handleChange} placeholder="Enter Other Information" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-center justify-center w-full col-span-1 md:col-span-2 lg:col-span-3">
            <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-600 hover:text-white transition duration-300">
              <Icon icon="mdi:upload" className="h-8 w-8" />
              <span className="mt-2 text-base leading-normal">Select a Profile Pic</span>
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
              Add Staff
            </button>
          </div>
        </form>
      </div>
    </div>
           
        </>
    );
};

export default AddStaff;
