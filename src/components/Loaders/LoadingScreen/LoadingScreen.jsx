import React from "react";
import styles from "./LoadingScreen.module.css";
import LoaderCircle from "../LoaderCircle/LoaderCircle";

const LoadingScreen = () => {
    return (
        <div className={styles["loading-screen"]}>
            <LoaderCircle className={styles["loading-screen__loader"]} />
        </div>
    );
};

export default LoadingScreen;
