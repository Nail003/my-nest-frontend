import React from "react";
import styles from "./AvatarsContainer.module.css";

const AvatarsContainer = ({ children }) => {
    return (
        <div
            data-testid="container"
            className={`${styles["avatars-container"]}`}
        >
            {children}
        </div>
    );
};

export default AvatarsContainer;
