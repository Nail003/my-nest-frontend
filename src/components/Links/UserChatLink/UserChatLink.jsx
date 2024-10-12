import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./UserChatLink.module.css";
import { UserContext } from "../../../contexts";
import { getChatName } from "../../../utils";

const UserChatLink = ({ userName, children }) => {
    const { user } = useContext(UserContext);

    if (user?.userName === userName) return <>{children}</>;

    const chatName = getChatName(user?.userName, userName);

    return (
        <Link to={`/home/${chatName}`} className={styles["user-chat-link"]}>
            {children}
        </Link>
    );
};

export default UserChatLink;
