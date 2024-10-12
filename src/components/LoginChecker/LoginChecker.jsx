import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts";
import { useNavigate } from "react-router-dom";

const LoginChecker = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate("/");
        }
    }, []);

    return <></>;
};

export default LoginChecker;
