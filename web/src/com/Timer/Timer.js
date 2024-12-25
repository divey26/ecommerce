import React, { useState, useEffect } from 'react';

const TimeLimitPage = () => {
  const [deadline, setDeadline] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const saveDeadline = async () => {
    if (deadline) {
      try {
        const response = await fetch('http://localhost:5000/api/deadline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deadline }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        alert('Deadline saved successfully!');
        setIsSaved(true);
      } catch (error) {
        console.error('Error saving deadline:', error);
        alert('Failed to save deadline. Please try again.');
      }
    } else {
      alert('Please select a valid date and time.');
    }
  };
  

  return (
    <div>
      <h1>Set Time Limit</h1>
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={saveDeadline}>Save Deadline</button>
      {isSaved && <p>Deadline saved successfully!</p>}
    </div>
  );
};

export default TimeLimitPage;





