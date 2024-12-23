import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TimeLimitPage = () => {
  const [deadline, setDeadline] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleSubmit = () => {
    if (deadline) {
      // Save the deadline in localStorage or context
      localStorage.setItem('deadline', deadline);
      navigate('/');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Set Time Limit</h1>
      <input
        type="datetime-local"
        value={deadline}
        onChange={handleChange}
        style={{ padding: '0.5rem', fontSize: '1rem', marginRight: '1rem' }}
      />
      <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
        Set Time
      </button>
    </div>
  );
};

export default TimeLimitPage;
