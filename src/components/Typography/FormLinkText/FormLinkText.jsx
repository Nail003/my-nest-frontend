import React from "react";
import { Link } from "react-router-dom";
import styles from "./FormLinkText.module.css";

const FormLinkText = ({ to, linkText, children }) => {
    return (
        <p>
            {children}{" "}
            <Link className={`${styles.link}`} to={to}>
                {linkText}
            </Link>
        </p>
    );
};

export default FormLinkText;
