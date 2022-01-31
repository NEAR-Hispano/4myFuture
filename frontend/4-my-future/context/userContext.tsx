import { createContext, FC, useState } from "react";
import  User  from "../models/User";

export const UserContext = createContext<
  [
    User | null,
    React.Dispatch<React.SetStateAction<User | null>> | null
  ]
>([null, null]);

const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;