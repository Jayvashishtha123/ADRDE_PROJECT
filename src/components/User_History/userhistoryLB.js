import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../contexts/authContext";

function UserDataLB() {
  const { currentUser } = useAuth();
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const lunchQuery = query(collection(db, "LunchBooking"), where("userId", "==", currentUser.uid));
          const lunchSnapshot = await getDocs(lunchQuery);
          const lunchBookings = lunchSnapshot.docs.map((doc) => ({
            id: doc.id,
            type: "Lunch Booking",
            ...doc.data(),
          }));
          setBookingData(lunchBookings);
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData(); // Fetch data when currentUser changes
  }, [currentUser]);

  const handleDeleteBooking = async (bookingId) => {
    try {
      const bookingDocRef = doc(db, "LunchBooking", bookingId); // Get reference to the specific document
      await deleteDoc(bookingDocRef);
      // Update state to remove the deleted booking
      setBookingData((prevData) => prevData.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="user-data-container">
      <h1 className="user-data-heading">Your Requests Data</h1>
      <table className="user-data-table">
        <thead>
          <tr className="user-data-table-header">
            <th>Serial No.</th>
            <th>Type</th>
            <th>User Name</th>
            <th>Department</th>
            <th>Date</th>
            <th>Details</th>
            <th>Timestamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking, index) => (
            <tr key={booking.id} className="user-data-table-row">
              <td className="user-data-table-cell">{index + 1}</td>
              <td className="user-data-table-cell">{booking.mealType}</td>
              <td className="user-data-table-cell">{booking.userName}</td>
              <td className="user-data-table-cell">{booking.department}</td>
              <td className="user-data-table-cell">{booking.date}</td>
              <td className="user-data-table-cell">{booking.specialRequests}</td>
              <td className="user-data-table-cell">{booking.timestamp.toDate().toLocaleString()}</td>
              <td className="user-data-table-cell">
                <button onClick={() => handleDeleteBooking(booking.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDataLB;
