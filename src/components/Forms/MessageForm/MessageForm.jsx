import React, { useContext, useRef, useState } from "react";
import { Form } from "../";
import { ButtonText } from "../../Buttons";
import { InputMessage } from "../../Inputs";
import styles from "./MessageForm.module.css";
import { sendMessage } from "../../../services/messages";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../contexts";

const MessageForm = () => {
    const [message, setMessage] = useState("");
    const [sendingMessage, setSendingMessage] = useState(false);

    const { chatName } = useParams();
    const { user } = useContext(UserContext);
    const submitButtonRef = useRef();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const { isLoggedIn } = user;

        try {
            if (isLoggedIn) {
                setSendingMessage(true);
                await sendMessage(message, chatName);
            } else {
                navigate("/");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setSendingMessage(false);
        }

        setMessage("");
    }

    return (
        <Form onSubmit={handleSubmit} className={`${styles["message-form"]}`}>
            <InputMessage
                value={message}
                setValue={setMessage}
                maxLength={128}
                submitButtonRef={submitButtonRef}
                required
            />
            <ButtonText loading={sendingMessage} innerRef={submitButtonRef}>
                Send
            </ButtonText>
        </Form>
    );
};

export default MessageForm;
