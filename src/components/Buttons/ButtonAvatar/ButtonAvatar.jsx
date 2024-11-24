import PropType from "prop-types";
import React from "react";
import { ImgAvatar } from "../../Images";
import styles from "./ButtonAvatar.module.css";

const ButtonAvatar = ({ avatarIndex, avatar, setAvatar, ...props }) => {
    const isActiveAvatar = avatarIndex === avatar;

    function handleClick(e) {
        e.preventDefault();
        setAvatar(avatarIndex);
    }

    return (
        <button
            onClick={handleClick}
            className={`${styles["button-avatar"]} ${
                isActiveAvatar && styles["button-avatar--active"]
            }`}
            {...props}
        >
            <ImgAvatar {...{ avatarIndex }} />
        </button>
    );
};

ButtonAvatar.propTypes = {
    avatarIndex: PropType.number,
    avatar: PropType.number,
    setAvatar: PropType.func,
};

export default ButtonAvatar;
