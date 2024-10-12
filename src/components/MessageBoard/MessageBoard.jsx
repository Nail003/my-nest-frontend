import React from "react";
import { MessagesContainer } from "../Containers";
import styles from "./MessageBoard.module.css";
import { MessageForm } from "../Forms";

const MessageBoard = () => {
    return (
        <section className={`${styles["message-board"]}`}>
            <MessagesContainer />
            <MessageForm />
        </section>
    );
};

export default MessageBoard;
