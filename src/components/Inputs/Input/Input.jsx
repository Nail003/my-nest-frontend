import React from "react";
import styles from "./Input.module.css";

const Input = ({ label, setValue, ...props }) => {
    const inputId = label.toLowerCase();

    function handleChange(e) {
        setValue(e.target.value);
    }

    return (
        <div className={`${styles["input-container"]}`}>
            <label className={`${styles.input__label}`} htmlFor={inputId}>
                {label}
            </label>
            <input
                className={`${styles.input}`}
                type="text"
                name={inputId}
                id={inputId}
                onChange={handleChange}
                {...props}
            />
        </div>
    );
};

export default Input;
