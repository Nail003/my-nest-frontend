import React, { useEffect, useState } from "react";
import { ImgAvatar } from "../../Images";
import { getUserAvatar } from "../../../services/user";

const UserAvatar = ({ userName }) => {
    const [avatar, setAvatar] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAvatar();
    }, [userName]);

    async function getAvatar() {
        setLoading(true);
        try {
            const { avatar, ok } = await getUserAvatar(userName);
            if (ok) setAvatar(avatar);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return <ImgAvatar avatarIndex={avatar} alt={userName} {...{ loading }} />;
};

export default UserAvatar;
