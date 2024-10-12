import React from "react";
import styles from "./FormLinksContainer.module.css";

const FormLinksContainer = ({ children }) => {
    return (
        <div
            data-testid="container"
            className={`${styles["form-links-container"]}`}
        >
            {children}
        </div>
    );
};

export default FormLinksContainer;
