import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { Header, Main } from "./components";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider, UserContextProvider } from "./contexts";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AppContextProvider>
                <UserContextProvider>
                    <Header />
                    <Main />
                </UserContextProvider>
            </AppContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
