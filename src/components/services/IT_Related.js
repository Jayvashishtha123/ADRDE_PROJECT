import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../contexts/authContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Service1() {
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");
  const [availableItems, setAvailableItems] = useState("");
  const [requiredItems, setRequiredItems] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const { currentUser } = useAuth(); // Assuming this hook gives you the current user info

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!currentUser) {
      toast.error("Please login first!");
      return;
    }

    try {
      // Add form data to Firestore collection "ITRelated"
      await addDoc(collection(db, "ITRelated"), {
        userName,
        department,
        availableItems,
        requiredItems,
        selectedOption,
        timestamp: new Date(),
      });
      toast.success("Form submitted successfully!");

      // Reset form fields
      setUserName("");
      setDepartment("");
      setAvailableItems("");
      setRequiredItems("");
      setSelectedOption("");

    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("There was an error submitting the form.");
    }
  };

  return (
    <div className="service1-container">
      <ToastContainer />
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
            <option value="Cartridge">Cartridge</option>
            <option value="Printer">Printer</option>
            <option value="PC">PC</option>
            <option value="MFM">MFM</option>
            <option value="Scanner">Scanner</option>
            <option value="Others">Others</option>
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
        {/* <Link to="/MyrequestIT" className="service1-button">
          View Previous Requests
        </Link> */}
      </form>
    </div>
  );
}

export default Service1;
