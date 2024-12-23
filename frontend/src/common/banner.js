import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [deadline, setDeadline] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  // Fetch deadline from the backend
  useEffect(() => {
    const fetchDeadline = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/deadline');
        if (response.ok) {
          const data = await response.json();
          const parsedDeadline = new Date(data.deadline);
          setDeadline(parsedDeadline);
          setShowBanner(new Date() < parsedDeadline);
        }
      } catch (error) {
        console.error('Error fetching deadline:', error);
      }
    };

    fetchDeadline();

    // Timer to update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval
  }, []);

  // Update showBanner if current time changes
  useEffect(() => {
    if (deadline) {
      setShowBanner(currentTime < deadline);
    }
  }, [currentTime, deadline]);

  return (
    <>
      {showBanner && deadline && (
        <div style={{ background: 'yellow', padding: '10px', textAlign: 'center' }}>
          <h2>Special Offer Ends At: {deadline.toLocaleString()}</h2>
          <p>Time Remaining: {formatTimeRemaining(deadline - currentTime)}</p>
        </div>
      )}
    </>
  );
};

// Helper Function to Format Time Remaining
const formatTimeRemaining = (ms) => {
  if (ms <= 0) return 'Expired';

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export default Banner;
