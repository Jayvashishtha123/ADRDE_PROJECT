import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../contexts/authContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Service3() {
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please login first!");
      return;
    }

    try {
      await addDoc(collection(db, "LunchBooking"), {
        userName,
        department,
        date,
        mealType,
        specialRequests,
        timestamp: new Date(),
        userId: currentUser.uid,
      });
      toast.success("Form submitted successfully!");
      setUserName("");
      setDepartment("");
      setDate("");
      setMealType("");
      setSpecialRequests("");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("There was an error submitting the form.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const bookingDeadline = new Date();
  bookingDeadline.setHours(23, 45, 0, 0); // Set deadline to 10:45 PM
  const isBookingAllowed = currentTime < bookingDeadline;

  return (
    <div className="service3-container">
      <ToastContainer />
      <h1 className="service3-heading">Lunch Booking</h1>
      <p className="service3-description">
        This page contains information about lunch booking services.
      </p>
      
      {isBookingAllowed ? (
        <form className="service3-form" onSubmit={handleSubmit}>
          <div className="service3-form-group">
            <label className="service3-label" htmlFor="userName">
              User Name:
            </label>
            <input
              className="service3-input"
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="service3-form-group">
            <label className="service3-label" htmlFor="department">
              Department:
            </label>
            <input
              className="service3-input"
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
          <div className="service3-form-group">
            <label className="service3-label" htmlFor="date">
              Date:
            </label>
            <input
              className="service3-input"
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="service3-form-group">
            <label className="service3-label" htmlFor="mealType">
              Meal Type:
            </label>
            <select
              className="service3-select"
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              required
            >
              <option value="">Select meal type</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
          <div className="service3-form-group">
            <label className="service3-label" htmlFor="specialRequests">
              Special Requests:
            </label>
            <textarea
              className="service3-input"
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            ></textarea>
          </div>
          <button className="service3-button" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <div className="service3-notice">
          <p>Booking can only be done before 10:45 PM.</p>
        </div>
      )}
    </div>
  );
}

export default Service3;
