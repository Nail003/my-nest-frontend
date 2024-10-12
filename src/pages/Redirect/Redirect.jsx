import React, { useContext, useEffect } from "react";
import { Page } from "../../components/Containers";
import styles from "./Redirect.module.css";
import { UserContext, initialUser } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Redirect = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            const { userName } = jwtDecode(accessToken);
            setUser({ userName, isLoggedIn: true });
            navigate("/home");
        } else {
            setUser(initialUser);
            navigate("/login");
        }
    }, []);

    return (
        <Page className={`${styles.redirect}`}>
            <h1>Redirecting...</h1>
        </Page>
    );
};

export default Redirect;
