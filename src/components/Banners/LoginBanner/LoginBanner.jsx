import React from "react";
import styles from "./LoginBanner.module.css";

const LoginBanner = () => {
    return (
        <section className={`${styles["login-banner"]}`}>
            <h1 className={`${styles["login-banner__title"]}`}>My Nest</h1>
            <p className={`${styles["login-banner__text"]}`}>
                The hangout spot you always wanted
            </p>
        </section>
    );
};

export default LoginBanner;
