import { messageURL } from ".";
import { postWithAuthToken } from "../fetch";

export async function sendMessage(message, chatName) {
    const data = { message, chatName };
    let response = await postWithAuthToken(messageURL, data);
    response = await response.json();
    console.log(response);
    return response;
}
