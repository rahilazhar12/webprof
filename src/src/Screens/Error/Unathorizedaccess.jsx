// src/Components/ErrorPages/UnauthorizedAccess.js
import React from 'react';

const UnauthorizedAccess = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">403</h1>
        <h2 className="text-4xl font-semibold text-white mb-4">Unauthorized Access</h2>
        <p className="text-xl text-white mb-6">
          You do not have permission to view this page.
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-white text-purple-500 font-semibold rounded-lg shadow-md hover:bg-gray-100"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedAccess;
