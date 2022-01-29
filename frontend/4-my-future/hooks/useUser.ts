import { useContext } from "react";
import { UserContext } from "../context/userContext";

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;