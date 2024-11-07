import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc , getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/Firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, 
      async(user) => {
        if(user) {
          setCurrentUser(user);
          const userDoc = await getDoc(doc(db, 'Users', user.uid));
          if(userDoc.exists()) {
            setUserRole(userDoc.data().role);
          }
        } else {
          setCurrentUser(null);
          setUserRole(null);
        }
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);


  return (
    <AuthContext.Provider value={{ currentUser, userRole, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
