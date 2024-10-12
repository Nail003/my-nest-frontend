import React from "react";
import styles from "./FormMessage.module.css";

const FormMessage = ({ response }) => {
    return (
        <p
            className={`${styles["form-message"]} ${
                response?.ok && styles["form-message--success"]
            } ${response?.message && styles["form-message--visible"]}`}
        >
            {response?.message}
        </p>
    );
};

export default FormMessage;
