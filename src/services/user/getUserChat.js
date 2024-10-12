import { url } from "..";
import { postWithAuthToken } from "../fetch";

export async function getUserChats() {
    let response = await postWithAuthToken(`${url}/user/chats`, {});
    response = await response.json();
    return response;
}
