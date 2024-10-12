import React from "react";
import styles from "./ImgAvatar.module.css";
import { LoaderCircle } from "../../Loaders";

const ImgAvatar = ({ loading, ...props }) => {
    return (
        <>
            {loading ? (
                <LoaderCircle className={styles["img-avatar__loader"]} />
            ) : (
                <img className={`${styles["img-avatar"]}`} {...props} />
            )}
        </>
    );
};

export default ImgAvatar;
