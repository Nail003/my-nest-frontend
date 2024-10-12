import React from "react";
import { Home, Login, Redirect, Signup } from "../../pages";
import styles from "./Main.module.css";
import { Route, Routes } from "react-router-dom";

const Main = () => {
    return (
        <main className={`${styles.main}`}>
            <Routes>
                <Route path="/" element={<Redirect />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home/:chatName" element={<Home />} />
            </Routes>
        </main>
    );
};

export default Main;
