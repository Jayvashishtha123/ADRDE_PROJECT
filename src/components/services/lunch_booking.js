import React, { useState, useEffect } from "react";
import DigitalClock from "react-digital-clock";

function Service3() {
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const bookingDeadline = new Date();
  bookingDeadline.setHours(11, 0, 0, 0); // Set deadline to 11:00 AM
  const isBookingAllowed = currentTime < bookingDeadline;

  return (
    <div className="service3-container">
      <h1 className="service3-heading">Lunch Booking</h1>
      <p className="service3-description">
        This page contains information about lunch booking services.
      </p>
      <div className="service3-clock">
        {/* Displaying the digital clock */}
        <DigitalClock />
      </div>
      {!isBookingAllowed && (
        <div className="service3-notice">
          <p>Booking can only be done before 11:00 AM.</p>
        </div>
      )}
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
>
  <option value="">Select meal type</option>
  <option value="vegetarian">Vegetarian</option>
  <option value="nonVegetarian">Non-Vegetarian</option>
  <option value="vegan">Vegan</option>
  <option value="glutenFree">Gluten-Free</option>
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
</button>      </form>
    </div>
  );
}

export default Service3;



