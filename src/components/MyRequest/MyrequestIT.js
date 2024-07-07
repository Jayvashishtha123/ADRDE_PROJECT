import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../contexts/authContext";
import { toast } from 'react-toastify';

function MyrequestIT() {
  const [requests, setRequests] = useState([]);
  const { currentUser } = useAuth(); // Assuming this hook gives you the current user info

  useEffect(() => {
    if (currentUser) {
      const fetchRequests = async () => {
        const querySnapshot = await getDocs(collection(db, "ITRelated"));
        const userRequests = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.userName === currentUser.displayName) {
            userRequests.push({ id: doc.id, ...data });
          }
        });
        setRequests(userRequests);
      };
      fetchRequests();
    }
  }, [currentUser]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "ITRelated", id));
      toast.success("Request deleted successfully!");
      setRequests(requests.filter((request) => request.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast.error("There was an error deleting the request.");
    }
  };

  return (
    <div>
      <h1>Previous Requests</h1>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            {request.userName} - {request.selectedOption} - {request.timestamp.toDate().toLocaleDateString()}
            <button onClick={() => handleDelete(request.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyrequestIT;
