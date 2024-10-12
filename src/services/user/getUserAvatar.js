import { url } from "..";
import { postWithAuthToken } from "../fetch";

const fetchedAvatars = {};

export async function getUserAvatar(userName) {
    if (fetchedAvatars.hasOwnProperty(userName))
        return fetchedAvatars[userName];

    let response = await postWithAuthToken(`${url}/user/avatar`, {
        userNameAvatar: userName,
    });

    response = await response.json();

    if (response.ok) {
        fetchedAvatars[userName] = response;
    }

    return response;
}
