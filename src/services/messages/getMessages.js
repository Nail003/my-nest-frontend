import { messageURL } from ".";
import { postWithAuthToken } from "../fetch";

export async function getMessages(chatName, limit) {
    const data = { chatName, limit };
    let response = await postWithAuthToken(`${messageURL}/messages`, data);
    response = await response.json();
    return response;
}
