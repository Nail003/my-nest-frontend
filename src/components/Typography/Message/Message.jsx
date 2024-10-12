import React, { useContext } from "react";
import { UserContext } from "../../../contexts";
import { UserAvatar } from "../../User";
import styles from "./Message.module.css";
import { UserChatLink } from "../../Links";

const Message = ({ userName, message }) => {
    const { user } = useContext(UserContext);
    const isUserMessage = user.userName === userName;

    return (
        <div
            data-testid="message"
            className={`${styles.message} ${
                isUserMessage && styles["message--user"]
            }`}
        >
            <UserAvatar {...{ userName }} />
            <div>
                <UserChatLink {...{ userName }}>
                    <h4 className={styles["message__userName"]}>{userName}</h4>
                </UserChatLink>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Message;
