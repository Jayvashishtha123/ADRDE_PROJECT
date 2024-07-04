import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function DataDisplayIT() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ITRelated"));
        const documents = querySnapshot.docs.map((doc, index) => ({
          id: index + 1, // Assigning serial number (index + 1)
          ...doc.data(),
        }));
        setData(documents);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="data-display-container">
      <h1 className="data-display-heading">IT Related Service Requests</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>User Name</th>
            <th>Department</th>
            <th>Available Items</th>
            <th>Required Items</th>
            <th>Selected Option</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.userName}</td>
              <td>{item.department}</td>
              <td>{item.availableItems}</td>
              <td>{item.requiredItems}</td>
              <td>{item.selectedOption}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataDisplayIT;
