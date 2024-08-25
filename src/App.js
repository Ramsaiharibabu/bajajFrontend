import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            const res = await axios.post('http://localhost:5000/bfhl', parsedData);
            setResponse(res.data);
        } catch (error) {
            alert('Invalid JSON input or API error');
        }
    };

    const handleOptionChange = (e) => {
        const { value, checked } = e.target;
        setSelectedOptions(prev =>
            checked ? [...prev, value] : prev.filter(opt => opt !== value)
        );
    };

    const renderResponse = () => {
        if (!response) return null;
        const { numbers, alphabets, highest_lowercase_alphabet } = response;
        return (
            <div>
                {selectedOptions.includes('Numbers') && <p>Numbers: {JSON.stringify(numbers)}</p>}
                {selectedOptions.includes('Alphabets') && <p>Alphabets: {JSON.stringify(alphabets)}</p>}
                {selectedOptions.includes('Highest lowercase alphabet') && <p>Highest Lowercase Alphabet: {JSON.stringify(highest_lowercase_alphabet)}</p>}
            </div>
        );
    };

    return (
      <div class="form-container">
        {" "}
        <h1>Bajaj Finserv Health Challenge</h1>
        {/* <div> */}
          <textarea
            class="json-input"
            placeholder="Enter JSON here"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        {/* </div> */}
        <button class="submit-button" onClick={handleSubmit}>
          Submit
        </button>
        <div class="display-options">
          {" "}
          <h3>Select what to display:</h3>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest lowercase alphabet"
              onChange={handleOptionChange}
            />
            Highest lowercase alphabet
          </label>
        </div>
        {renderResponse()}
      </div>
    );
}

export default App;
