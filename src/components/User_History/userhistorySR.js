import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { useAuth } from "../contexts/authContext";

function SafetyRelatedData() {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const safetyQuery = query(collection(db, "SafetyRelated"), where("userId", "==", currentUser.uid));
          const safetySnapshot = await getDocs(safetyQuery);
          const safetyData = safetySnapshot.docs.map((doc) => ({
            id: doc.id,
            type: "Safety Related",
            ...doc.data(),
          }));
          setFormData(safetyData);
        }
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData(); // Fetch data when currentUser changes
  }, [currentUser]);

  const handleDeleteFormData = async (formId) => {
    try {
      await deleteDoc(collection(db, "SafetyRelated").doc(formId));
      // Update state to remove the deleted form
      setFormData((prevData) => prevData.filter((form) => form.id !== formId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="user-data-container">
      <h1 className="user-data-heading">Safety Related Requests Data</h1>
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
          {formData.map((form, index) => (
            <tr key={form.id} className="user-data-table-row">
              <td className="user-data-table-cell">{index + 1}</td>
              <td className="user-data-table-cell">{form.type}</td>
              <td className="user-data-table-cell">{form.userName}</td>
              <td className="user-data-table-cell">{form.department}</td>
              <td className="user-data-table-cell">{form.date}</td>
              <td className="user-data-table-cell">{form.details}</td>
              <td className="user-data-table-cell">{form.timestamp.toDate().toLocaleString()}</td>
              <td className="user-data-table-cell">
                <button onClick={() => handleDeleteFormData(form.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SafetyRelatedData;
