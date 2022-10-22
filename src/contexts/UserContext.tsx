import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext({} as UserContextProps);

interface UserProps {
  name: string;
}

interface Props {
  children?: React.ReactNode;
}

const defaultUser = {
  name: "",
};

interface UserContextProps {
  user: UserProps;
  registerUser: (name: string) => void;
}


 const UserProvider = ({ children }: Props) => {
  const initialUser = JSON.parse(
    localStorage.getItem("userPreferencesDonaClone") ||
      JSON.stringify(defaultUser)
  );

  const [user, setUser] = useState<UserProps>(initialUser);

  const registerUser = (name: string) => {
    setUser((prev) => ({ ...prev, name: name }));
  };

  const updateUser = useEffect(() => {
    localStorage.setItem("userPreferencesDonaClone", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;