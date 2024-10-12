import React, { useEffect, useState } from "react";
import { getUserChats } from "../../services/user";
import { EmptyChatBanner } from "../Banners";
import { InboxElement } from "../Elements";
import { LoadingScreen } from "../Loaders";
import { Sidebar } from "../Sidebars";
import styles from "./Inbox.module.css";

const Inbox = () => {
    const [userChats, setUserChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatLoadInterval = 10000;

    useEffect(() => {
        setLoading(true);
        loadChats().finally(() => {
            setLoading(false);
        });

        const chatInterval = setInterval(loadChats, chatLoadInterval);

        return () => {
            clearInterval(chatInterval);
        };
    }, []);

    async function loadChats() {
        try {
            const { chats, ok } = await getUserChats();

            if (ok) {
                setUserChats(chats);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Sidebar>
            <div className={styles.inbox}>
                <InboxElement />
                <h3 className={`${styles.inbox__heading}`}>Private Chats</h3>

                {loading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {userChats.length === 0 && (
                            <EmptyChatBanner text="Click on name to start a private chat" />
                        )}
                        {userChats.map((chatName) => (
                            <InboxElement key={chatName} {...{ chatName }} />
                        ))}
                    </>
                )}
            </div>
        </Sidebar>
    );
};

export default Inbox;
