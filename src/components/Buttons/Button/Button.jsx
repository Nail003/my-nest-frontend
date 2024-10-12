import PropType from "prop-types";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import styles from "./Button.module.css";

const Button = ({ children, loading = false, ...props }) => {
    return (
        <button className={`${styles.button}`} disabled={loading} {...props}>
            {loading ? <ThreeDots height={24} /> : children}
        </button>
    );
};

Button.propTypes = {
    children: PropType.any,
    loading: PropType.bool,
};

export default Button;
