import React from "react";
import styles from "./ButtonText.module.css";

const ButtonText = ({ children, innerRef, ...props }) => {
    return (
        <button
            ref={innerRef}
            className={`${styles["button-text"]}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default ButtonText;
