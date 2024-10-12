import { useState } from "react";
import { UserContext } from "./UserContext";

export const initialUser = { userName: "", isLoggedIn: false };

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(initialUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
