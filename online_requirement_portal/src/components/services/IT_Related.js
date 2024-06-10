// Service1.js
import React, { useState } from "react";

function Service1() {
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");
  const [availableItems, setAvailableItems] = useState("");
  const [requiredItems, setRequiredItems] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted!");
    console.log("User Name:", userName);
    console.log("Department:", department);
    console.log("Available Items:", availableItems);
    console.log("Required Items:", requiredItems);
    console.log("Selected Option:", selectedOption);
    // Reset form fields
    setUserName("");
    setDepartment("");
    setAvailableItems("");
    setRequiredItems("");
    setSelectedOption("");
  };

  return (
    <div className="service1-container">
      <h1 className="service1-heading">IT & Related</h1>
      <p className="service1-description">
        This page contains information about IT related services.
      </p>
      <form className="service1-form" onSubmit={handleSubmit}>

      <div className="service1-form-group">
          <label htmlFor="selectedOption" className="service1-label">
            Select Option:
          </label>
          <select
            id="selectedOption"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="service1-select"
            required
          >
            <option value="">Select an option</option>
            <option value="Option 1">Cartridge</option>
            <option value="Option 2">Printer</option>
            <option value="Option 3">PC</option>
            <option value="Option 3">MFM</option>
            <option value="Option 3">Scanner</option>
            <option value="Option 3">Others</option>


          </select>
        </div>
        <div className="service1-form-group">
          <label htmlFor="userName" className="service1-label">
            User Name:
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="service1-input"
            required
          />
        </div>
        <div className="service1-form-group">
          <label htmlFor="department" className="service1-label">
            Department:
          </label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="service1-input"
            required
          />
        </div>
        
        <div className="service1-form-group">
          <label htmlFor="availableItems" className="service1-label">
            No. of Available Items:
          </label>
          <input
            type="number"
            id="availableItems"
            value={availableItems}
            onChange={(e) => setAvailableItems(e.target.value)}
            className="service1-input"
            required
          />
        </div>
        <div className="service1-form-group">
          <label htmlFor="requiredItems" className="service1-label">
            No. of Required Items:
          </label>
          <input
            type="number"
            id="requiredItems"
            value={requiredItems}
            onChange={(e) => setRequiredItems(e.target.value)}
            className="service1-input"
            required
          />
        </div>
        <button type="submit" className="service1-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Service1;
