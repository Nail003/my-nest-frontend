import React from "react";
import styles from "./EmptyChatBanner.module.css";
import PropTypes from "prop-types";

const EmptyChatBanner = ({ text = "Send a message to break the ice" }) => {
    return (
        <div className={styles["empty-chat-banner"]}>
            <h1 className={styles["empty-chat-banner__message"]}>My Nest</h1>
            <h3 className={styles["empty-chat-banner__message"]}>{text}</h3>
        </div>
    );
};

EmptyChatBanner.propTypes = { text: PropTypes.string };

export default EmptyChatBanner;
