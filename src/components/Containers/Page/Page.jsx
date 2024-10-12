import React from "react";
import styles from "./Page.module.css";

const Page = ({ className, children }) => {
    return (
        <div data-testid="page" className={`${styles.page} ${className}`}>
            {children}
        </div>
    );
};

export default Page;
