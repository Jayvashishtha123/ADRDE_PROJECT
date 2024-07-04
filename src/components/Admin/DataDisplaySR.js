import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function DataDisplaySR() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "SafetyRelated"));
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFormData(documents);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="data-display-container">
      <h1 className="data-display-heading">Safety Related Form Data</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>User Name</th>
            <th>Department</th>
            <th>Equipment Type</th>
            <th>Fire Extinguisher Type</th>
            <th>Available Items</th>
            <th>Required Items</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((formData, index) => (
            <tr key={formData.id}>
              <td>{index + 1}</td>
              <td>{formData.userName}</td>
              <td>{formData.department}</td>
              <td>{formData.equipmentType}</td>
              <td>{formData.fireExtinguisherType}</td>
              <td>{formData.availableItems}</td>
              <td>{formData.requiredItems}</td>
              <td>{formData.timestamp.toDate().toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataDisplaySR;
