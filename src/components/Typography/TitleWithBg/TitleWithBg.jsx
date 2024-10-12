import React from "react";
import styles from "./TitleWithBg.module.css";

const TitleWithBg = ({ children }) => {
    return <h1 className={`${styles.title}`}>{children}</h1>;
};

export default TitleWithBg;
