import React from "react";
import styles from "./AvatarSelector.module.css";
import { ButtonAvatar } from "../../Buttons";
import { avatars } from "../../../assets/avatars";
import { AvatarsContainer } from "../../Containers";

const AvatarSelector = (props) => {
    return (
        <div
            data-testid="AvatarSelector"
            className={`${styles["avatar-selector"]}`}
        >
            <h3 className={`${styles["avatar-selector__title"]}`}>
                Choose your Avatar
            </h3>
            <AvatarsContainer>
                {avatars.map((_src, avatarIndex) => (
                    <ButtonAvatar
                        key={avatarIndex}
                        {...{ avatarIndex, ...props }}
                    />
                ))}
            </AvatarsContainer>
        </div>
    );
};

export default AvatarSelector;
