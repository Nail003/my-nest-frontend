import { useState } from "react";

export function useCredentialFormStates() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    return {
        userName,
        password,
        response,
        loading,
        setUserName,
        setPassword,
        setResponse,
        setLoading,
    };
}
