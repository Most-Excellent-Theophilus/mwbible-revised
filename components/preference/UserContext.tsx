// UserContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the shape of the user data
type User = {
  language : {
    options: 'Ch' | 'En'| 'Tu'|'Yao';
    isStrictMode: boolean;
  };
  version?: string;
  revision?: string;
  book: string;
  chapter: string;
  verse?: string;


};

// Define the shape of the context state
interface UserContextType {
  user: User | null;
  UpdateUserContext: (userData: User) => void;
  updateUserPreferences: (language: User['language']) => void;
}

// Create a context with the UserContextType
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const UpdateUserContext = (userData: User) => {
    setUser(userData);
  };

  const updateUserPreferences=(language: User['language'])=>{
    setUser((prevUser) => prevUser ? { ...prevUser, language } : prevUser);
  }

  return (
    <UserContext.Provider value={{ user, UpdateUserContext, updateUserPreferences}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
