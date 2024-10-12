import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, UserContext } from "../../contexts";
import { Button, ButtonMenu } from "../Buttons";
import { HeaderSubContainer } from "../Containers";
import { UserAvatar } from "../User";
import styles from "./Header.module.css";
import { useMediaQuery } from "@react-hook/media-query";

const Header = () => {
    const { user } = useContext(UserContext);
    const { openSidebar } = useContext(AppContext);
    const isMobile = useMediaQuery("(width < 700px)");
    const { userName, isLoggedIn } = user;
    const navigate = useNavigate();

    function handleLoggoutButton() {
        localStorage.removeItem("accessToken");
        openSidebar();
        navigate("/");
    }

    return (
        <header className={`${styles.header}`}>
            <HeaderSubContainer>
                {isLoggedIn && isMobile && <ButtonMenu />}
                <h1 className={`${styles.header__title}`}>My Nest</h1>
            </HeaderSubContainer>
            {isLoggedIn && (
                <HeaderSubContainer>
                    <UserAvatar {...{ userName }} />
                    <Button onClick={handleLoggoutButton}>
                        <h4 className={styles.header__text}>Logout</h4>
                    </Button>
                </HeaderSubContainer>
            )}
        </header>
    );
};

export default Header;
