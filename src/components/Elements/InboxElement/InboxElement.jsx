import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { globe } from "../../../assets/imgs";
import { ImgAvatar } from "../../Images";
import styles from "./InboxElement.module.css";
import { AppContext, UserContext } from "../../../contexts";
import { UserAvatar } from "../../User";
import { useMediaQuery } from "@react-hook/media-query";

const globalChat = "Global Chat";

const InboxElement = ({ chatName = globalChat, avatar = globe }) => {
    const { user } = useContext(UserContext);
    const { closeSidebar } = useContext(AppContext);
    const isMobile = useMediaQuery("(width < 700px)");
    const navigate = useNavigate();
    const params = useParams();
    let chatUserName = chatName;
    let isGlobalChat = true;
    const isActive = params?.chatName === chatName;

    if (chatName !== globalChat) {
        const { userName } = user;
        const [firstUser, secondUser] = chatName.split(" ");

        chatUserName = userName === firstUser ? secondUser : firstUser;
        isGlobalChat = false;
    }

    function handleClick(e) {
        e.preventDefault();
        if (isMobile) closeSidebar();
        navigate(`/home/${chatName}`);
    }

    return (
        <button
            onClick={handleClick}
            className={`${styles["inbox-element"]} ${
                isActive && styles["inbox-element--active"]
            }`}
        >
            {isGlobalChat ? (
                <ImgAvatar src={avatar} />
            ) : (
                <UserAvatar userName={chatUserName} />
            )}
            <h2 className={`${styles["inbox-element__user-name"]}`}>
                {chatUserName}
            </h2>
        </button>
    );
};

export default InboxElement;
