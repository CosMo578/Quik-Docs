// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../lib/supabaseClient";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check active session
//     const getSession = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();
//       setUser(session?.user ?? null);
//       setLoading(false);
//     };

//     getSession();

//     // Listen for auth state changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//       setLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const value = {
//     user,
//     loading,
//     signIn: async (email, password) => {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       if (error) throw error;
//       return data;
//     },
//     signOut: async () => {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//     },
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export const useAuth = () => useContext(AuthContext);
