import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

const options = [
  { value: "Numbers", label: "Numbers" },
  { value: "Alphabets", label: "Alphabets" },
  { value: "Highest lowercase alphabet", label: "Highest lowercase alphabet" },
];

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post(
        "https://bajaj-api-rho.vercel.app/bfhl",
        parsedData
      );
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON input or API error");
    }
  };

  const handleOptionChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const selectedValues = selectedOptions.map((option) => option.value);
    return (
      <div className="output">
        <h1>Filtered Responses</h1>
        {selectedValues.includes("Numbers") && (
          <p>Numbers: {JSON.stringify(numbers)}</p>
        )}
        {selectedValues.includes("Alphabets") && (
          <p>Alphabets: {JSON.stringify(alphabets)}</p>
        )}
        {selectedValues.includes("Highest lowercase alphabet") && (
          <p>
            Highest Lowercase Alphabet:{" "}
            {JSON.stringify(highest_lowercase_alphabet)}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="form-container">
      <h1>Bajaj Finserv Health Challenge</h1>
      <div className="input-group">
        <label htmlFor="json-input">API Input</label>
        <textarea
          id="json-input"
          className="json-input"
          placeholder="Enter JSON here"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <div className="display-options">
        <h3>Multi Filter:</h3>
        <Select
          options={options}
          isMulti
          onChange={handleOptionChange}
          value={selectedOptions}
          className="multi-select"
        />
      </div>
      {renderResponse()}
    </div>
  );
}

export default App;
