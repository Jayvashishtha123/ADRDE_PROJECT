import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../contexts/authContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Service2() {
  const [selectedOption, setSelectedOption] = useState("");
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [fireExtinguisherType, setFireExtinguisherType] = useState("");
  const [availableItems, setAvailableItems] = useState("");
  const [requiredItems, setRequiredItems] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Assuming this hook gives you the current user info

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    try {
      await addDoc(collection(db, "SafetyRelated"), {
        selectedOption,
        userName,
        department,
        equipmentType,
        fireExtinguisherType,
        availableItems,
        requiredItems,
        timestamp: new Date(),
      });
      toast.success("Form submitted successfully!");

      // Reset form fields
      setSelectedOption("");
      setUserName("");
      setDepartment("");
      setEquipmentType("");
      setFireExtinguisherType("");
      setAvailableItems("");
      setRequiredItems("");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("There was an error submitting the form.");
    }
  };

  return (
    <div className="service2-container">
      <ToastContainer />
      <h1 className="service2-heading">Safety Related</h1>
      <p className="service2-description">
        This page contains information about safety related services.
      </p>
      <form className="service2-form" onSubmit={handleSubmit}>
        <div className="service2-form-group">
          <label className="service2-label" htmlFor="safetyEquipment">
            Select Safety Equipment:
          </label>
          <select
            className="service2-select"
            id="safetyEquipment"
            value={selectedOption}
            onChange={handleOptionChange}
            required
          >
            <option value="">Select an option</option>
            <option value="safetyEquipment">Safety Equipment</option>
            <option value="trialEquipments">Trial Equipments</option>
          </select>
        </div>
        {(selectedOption === "safetyEquipment" || selectedOption === "trialEquipments") && (
          <>
            <div className="service2-form-group">
              <label className="service2-label" htmlFor="userName">
                User Name:
              </label>
              <input
                className="service2-input"
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="service2-form-group">
              <label className="service2-label" htmlFor="department">
                Department:
              </label>
              <input
                className="service2-input"
                type="text"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
            <div className="service2-form-group">
              <label className="service2-label" htmlFor="equipmentType">
                Equipment Type:
              </label>
              <select
                className="service2-select"
                id="equipmentType"
                value={equipmentType}
                onChange={(e) => setEquipmentType(e.target.value)}
                required
              >
                <option value="">Select equipment type</option>
                <option value="fireExtinguisher">Fire Extinguishers</option>
                <option value="safetyShoes">Safety Shoes</option>
                <option value="firstAidBox">First Aid Box</option>
                <option value="handGloves">Hand Gloves</option>
                <option value="safetyHelmet">Safety Helmet</option>
                <option value="safetySpectacles">Safety Spectacles</option>
                <option value="hearingProtection">Hearing Protection</option>
                <option value="anyOther">Any Other</option>
              </select>
            </div>
            {equipmentType === "fireExtinguisher" && (
              <div className="service2-form-group">
                <label className="service2-label" htmlFor="fireExtinguisherType">
                  Fire Extinguisher Type:
                </label>
                <select
                  className="service2-select"
                  id="fireExtinguisherType"
                  value={fireExtinguisherType}
                  onChange={(e) => setFireExtinguisherType(e.target.value)}
                  required
                >
                  <option value="">Select extinguisher type</option>
                  <option value="abc6kg">ABC type 6KG</option>
                  <option value="abc9kg">ABC type 9KG</option>
                  <option value="co26kg">CO2 6KG</option>
                  <option value="cleanAgent">Clean agent type</option>
                  <option value="other">Any other</option>
                </select>
              </div>
            )}
            <div className="service2-form-group">
              <label className="service2-label" htmlFor="availableItems">
                No. of Available Items:
              </label>
              <input
                className="service2-input"
                type="number"
                id="availableItems"
                value={availableItems}
                onChange={(e) => setAvailableItems(e.target.value)}
                required
              />
            </div>
            <div className="service2-form-group">
              <label className="service2-label" htmlFor="requiredItems">
                No. of Required Items:
              </label>
              <input
                className="service2-input"
                type="number"
                id="requiredItems"
                value={requiredItems}
                onChange={(e) => setRequiredItems(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <button className="service2-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Service2;
