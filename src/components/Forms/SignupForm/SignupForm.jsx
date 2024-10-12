import React, { useState } from "react";
import { Form } from "../";
import { Button } from "../../Buttons";
import { AvatarSelector, Input } from "../../Inputs";
import { FormLinkText, FormMessage, TitleWithBg } from "../../Typography";
import { FormLinksContainer } from "../../Containers";
import { createUser } from "../../../services/user";
import { avatars } from "../../../assets/avatars";
import { useCredentialFormStates } from "../../../hooks";

const initailAvatar = avatars[0];

const SignupForm = () => {
    const [avatar, setAvatar] = useState(initailAvatar);
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

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setResponse(null);

        try {
            const result = await createUser(userName, password, avatar);
            setResponse(result);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <TitleWithBg>SIGN UP</TitleWithBg>
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
            <AvatarSelector {...{ avatar, setAvatar }} />
            <FormMessage response={response} />
            <Button {...{ loading }}>Sign Up</Button>
            <FormLinksContainer>
                <FormLinkText to="/login" linkText="login">
                    Click here to
                </FormLinkText>
            </FormLinksContainer>
        </Form>
    );
};

export default SignupForm;
