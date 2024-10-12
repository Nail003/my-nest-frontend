import React, { useState } from "react";
import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
    const [displaySidebar, setDisplaySidebar] = useState(true);

    function toggleSidebar() {
        setDisplaySidebar((prev) => !prev);
    }

    function closeSidebar() {
        setDisplaySidebar(false);
    }

    function openSidebar() {
        setDisplaySidebar(true);
    }

    return (
        <AppContext.Provider
            value={{
                displaySidebar,
                toggleSidebar,
                closeSidebar,
                openSidebar,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
