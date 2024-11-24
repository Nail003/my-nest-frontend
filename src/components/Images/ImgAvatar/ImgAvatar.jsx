import React from "react";
import styles from "./ImgAvatar.module.css";
import { LoaderCircle } from "../../Loaders";
import { avatars } from "../../../assets/avatars";

const ImgAvatar = ({ loading, avatarIndex, ...props }) => {
    return (
        <>
            {loading ? (
                <LoaderCircle className={styles["img-avatar__loader"]} />
            ) : (
                <img
                    className={`${styles["img-avatar"]}`}
                    src={avatars[avatarIndex]}
                    {...props}
                />
            )}
        </>
    );
};

export default ImgAvatar;
