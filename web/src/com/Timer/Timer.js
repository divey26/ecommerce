import React, { useState, useEffect } from 'react';

const TimeLimitPage = () => {
  const [deadline, setDeadline] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const saveDeadline = async () => {
    if (deadline) {
      await fetch('http://localhost:5000/api/deadline', {  // change port to 5000
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deadline }),
      });
      alert('Deadline saved successfully!');
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
