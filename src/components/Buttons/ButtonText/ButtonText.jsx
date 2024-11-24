import React from "react";
import styles from "./ButtonText.module.css";
import { ThreeDots } from "react-loader-spinner";

const ButtonText = ({ children, loading = false, innerRef, ...props }) => {
    return (
        <button
            ref={innerRef}
            className={`${styles["button-text"]}`}
            disabled={loading}
            {...props}
        >
            {loading ? <ThreeDots height={16} width={"100%"} /> : children}
        </button>
    );
};

export default ButtonText;
