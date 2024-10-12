import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import { AppContext } from "../../../contexts";

const Sidebar = ({ className, children }) => {
    const { displaySidebar } = useContext(AppContext);

    const animatedStyle = displaySidebar
        ? styles["expand"]
        : styles["collapse"];

    return (
        <>
            <section
                data-testid="sidebar"
                className={`${styles.sidebar} ${animatedStyle}  ${className}`}
            >
                {children}
            </section>
        </>
    );
};

export default Sidebar;
