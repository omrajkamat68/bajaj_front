import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 
function App() {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);
    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND_URL, JSON.parse(inputData));
      setResponse(res.data);
    } catch (error) {
      setError('Invalid JSON format or API error. Please check your input.');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Data Processing Web App</h1>
        <p>Enter JSON input to interact with the backend API</p>
      </header>
      <main className="form-container">
        <form onSubmit={handleSubmit}>
          <textarea
            className="input-area"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder='Enter JSON here...'
            rows="8"
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {response && (
          <div className="response-container">
            <h2>Response</h2>
            <pre className="response-display">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
