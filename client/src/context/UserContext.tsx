import { createContext } from "react";

const UserContext = createContext<{
  login: boolean;
  setLogin: (login: boolean) => void;
}>({
  login: false,
  setLogin: () => {},
});

export default UserContext;
