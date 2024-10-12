import PropType from "prop-types";
import React from "react";
import { ImgAvatar } from "../../Images";
import styles from "./ButtonAvatar.module.css";

const ButtonAvatar = ({ src, avatar, setAvatar, ...props }) => {
    const isActiveAvatar = src === avatar;

    function handleClick(e) {
        e.preventDefault();
        setAvatar(src);
    }

    return (
        <button
            onClick={handleClick}
            className={`${styles["button-avatar"]} ${
                isActiveAvatar && styles["button-avatar--active"]
            }`}
            {...props}
        >
            <ImgAvatar {...{ src }} />
        </button>
    );
};

ButtonAvatar.propTypes = {
    src: PropType.string,
    avatar: PropType.string,
    setAvatar: PropType.func,
};

export default ButtonAvatar;
