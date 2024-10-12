import React from "react";
import styles from "./InputMessage.module.css";

const InputMessage = ({ value, setValue, submitButtonRef, ...props }) => {
    function handleKeyPress(e) {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            submitButtonRef.current.click();
        }
    }

    function handleChange(e) {
        setValue(e.target.value);
    }

    return (
        <textarea
            rows={1}
            className={`${styles["input-message"]}`}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            {...props}
        />
    );
};

export default InputMessage;
