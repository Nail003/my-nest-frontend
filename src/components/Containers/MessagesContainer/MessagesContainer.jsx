import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessages } from "../../../services/messages";
import { LoadingScreen } from "../../Loaders";
import { Message } from "../../Typography";
import styles from "./MessagesContainer.module.css";
import { EmptyChatBanner } from "../../Banners";

const MessagesContainer = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { chatName } = useParams();
    const limit = 20;
    const messageLoadInterval = 5000;

    useEffect(() => {
        setLoading(true);
        loadMessages().finally(() => {
            setLoading(false);
        });

        const messageInterval = setInterval(loadMessages, messageLoadInterval);

        return () => {
            clearInterval(messageInterval);
        };
    }, [chatName]);

    async function loadMessages() {
        try {
            const response = await getMessages(chatName, limit);
            if (response.ok) {
                setMessages(response.messages);
            } else {
                console.log(response);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={`${styles["message-container"]}`}>
            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    {messages.length === 0 && <EmptyChatBanner />}
                    {messages.map(({ message, _id, userName }) => (
                        <Message key={_id} {...{ userName, message }}></Message>
                    ))}
                </>
            )}
        </div>
    );
};

export default MessagesContainer;
