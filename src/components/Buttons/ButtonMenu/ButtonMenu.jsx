import React, { useContext } from "react";
import styles from "./ButtonMenu.module.css";
import { AppContext } from "../../../contexts";

const ButtonMenu = () => {
    const { displaySidebar, toggleSidebar } = useContext(AppContext);

    return (
        <button className={styles["button-menu"]} onClick={toggleSidebar}>
            <div
                data-testid="bar1"
                className={`${styles.bar1} ${displaySidebar && styles.change}`}
            ></div>
            <div
                data-testid="bar2"
                className={`${styles.bar2} ${displaySidebar && styles.change}`}
            ></div>
            <div
                data-testid="bar3"
                className={`${styles.bar3} ${displaySidebar && styles.change}`}
            ></div>
        </button>
    );
};

export default ButtonMenu;
