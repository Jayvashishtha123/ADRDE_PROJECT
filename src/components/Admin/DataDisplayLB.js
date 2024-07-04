import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function DataDisplayLB() {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "LunchBooking"));
        const documents = querySnapshot.docs.map((doc, index) => ({
          id: index + 1, // Assigning serial number (index + 1)
          ...doc.data(),
        }));
        setBookingData(documents);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="data-display-container">
      <h1 className="data-display-heading">Lunch Booking Data</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>User Name</th>
            <th>Department</th>
            <th>Date</th>
            <th>Meal Type</th>
            <th>Special Requests</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.userName}</td>
              <td>{booking.department}</td>
              <td>{booking.date}</td>
              <td>{booking.mealType}</td>
              <td>{booking.specialRequests}</td>
              <td>{booking.timestamp.toDate().toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataDisplayLB;
