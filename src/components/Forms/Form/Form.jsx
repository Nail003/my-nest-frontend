import React from "react";
import styles from "./Form.module.css";

const Form = ({ children, className, ...props }) => {
    return (
        <form
            data-testid="form"
            className={`${styles.form} ${className}`}
            {...props}
        >
            {children}
        </form>
    );
};

export default Form;
