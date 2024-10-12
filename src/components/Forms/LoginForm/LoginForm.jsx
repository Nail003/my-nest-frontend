import React, { useContext } from "react";
import { Form } from "../";
import { useCredentialFormStates } from "../../../hooks";
import { getUser } from "../../../services/user";
import { Button } from "../../Buttons";
import { FormLinksContainer } from "../../Containers";
import { Input } from "../../Inputs";
import { FormLinkText, FormMessage, TitleWithBg } from "../../Typography";
import { UserContext } from "../../../contexts";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const {
        userName,
        password,
        response,
        loading,
        setUserName,
        setPassword,
        setResponse,
        setLoading,
    } = useCredentialFormStates();

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setResponse("");
        setLoading(true);

        try {
            const result = await getUser(userName, password);
            if (result.ok) {
                setUser({ userName, isLoggedIn: true });
                localStorage.setItem("accessToken", result.accessToken);
                navigate("/");
            } else {
                setResponse(result);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <TitleWithBg>LOGIN</TitleWithBg>
            <Input
                label="UserName"
                placeholder="Username"
                value={userName}
                setValue={setUserName}
                required
                minLength={4}
                maxLength={16}
            />
            <Input
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                setValue={setPassword}
                required
                minLength={4}
                maxLength={32}
            />
            <FormMessage response={response} />
            <Button {...{ loading }}>Login</Button>
            <FormLinksContainer>
                <FormLinkText to="/signup" linkText="create new account">
                    Click here to
                </FormLinkText>
            </FormLinksContainer>
        </Form>
    );
};

export default LoginForm;
