import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import logo from '../../assets/logo.png';

const WelcomePage = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-400 text-white">
      {/* <Confetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        numberOfPieces={200}
        gravity={0.05}
        colors={['#ffffff', '#0000ff']} // White and blue for a more formal look
        wind={0.01}
        initialVelocityY={1}
      /> */}
      <img src={logo} alt="Logo" className="h-32 mb-8 md:h-48" />
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">Welcome to WEB PRO SCHOOL</h1>
      {/* <p className="text-lg md:text-2xl mb-6 text-center">Your journey to success starts here!</p>
      <button className="py-3 px-6 bg-white text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
        Get Started
      </button> */}
    </div>
  );
};

export default WelcomePage;
