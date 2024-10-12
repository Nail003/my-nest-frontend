import React from "react";
import styles from "./HeaderSubContainer.module.css";

const HeaderSubContainer = ({ children }) => {
    return (
        <div data-testid="container" className={styles["header-sub-container"]}>
            {children}
        </div>
    );
};

export default HeaderSubContainer;
