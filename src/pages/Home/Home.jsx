import React from "react";
import { useParams } from "react-router-dom";
import { Inbox, LoginChecker, MessageBoard } from "../../components";
import { LoginBanner } from "../../components/Banners";
import { Page } from "../../components/Containers";
import styles from "./Home.module.css";
import { useMediaQuery } from "@react-hook/media-query";

const Home = () => {
    const { chatName } = useParams();
    const isNotMobile = useMediaQuery("width >= 700px");

    return (
        <Page>
            <LoginChecker />
            <div className={styles.home}>
                <Inbox />
                {chatName ? <MessageBoard /> : isNotMobile && <LoginBanner />}
            </div>
        </Page>
    );
};

export default Home;
