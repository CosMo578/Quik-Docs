import { useState } from "react";
import { db } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { createContext, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUserUid = user.uid;

        // Filter based on UID (or email, if preferred)
        const q = query(
          collection(db, "User_Detail"),
          where("Userid", "==", currentUserUid),
        );
        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // Process the retrieved data
              const userData = { id: doc.id, ...doc.data() };
              setUsers(userData);
              console.log(userData.email);
            });
          })
          .catch((error) => {
            console.error("Error getting documents: ", error);
          });
      } else {
        // User is not signed in
        console.log("User is not signed in");
      }
    });
  }, []);
  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};
