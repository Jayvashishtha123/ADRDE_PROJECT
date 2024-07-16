import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { useAuth } from "../contexts/authContext";

function UserDataIT() {
  const { currentUser } = useAuth();
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const itQuery = query(collection(db, "ITRelated"), where("userId", "==", currentUser.uid));
          console.log("Query:", itQuery); // Debugging: Log the query to check parameters
          
          const itSnapshot = await getDocs(itQuery);
          console.log("Snapshot:", itSnapshot.docs); // Debugging: Log the snapshot to check data received

          const itBookings = itSnapshot.docs.map((doc) => ({
            id: doc.id,
            type: "IT Related Service Request",
            ...doc.data(),
          }));

          setBookingData(itBookings);
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData(); // Call fetchData initially

    // Ensure fetchData is called whenever currentUser changes
  }, [currentUser]);

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteDoc(collection(db, "ITRelated").doc(bookingId));
      setBookingData((prevData) => prevData.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="user-data-container">
      <h1 className="user-data-heading">My IT Related Service Requests</h1>
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
              <td className="user-data-table-cell">{booking.type}</td>
              <td className="user-data-table-cell">{booking.userName}</td>
              <td className="user-data-table-cell">{booking.department}</td>
              <td className="user-data-table-cell">{booking.date}</td>
              <td className="user-data-table-cell">{booking.details}</td>
              <td className="user-data-table-cell">{booking.timestamp?.toDate().toLocaleString()}</td>
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

export default UserDataIT;
