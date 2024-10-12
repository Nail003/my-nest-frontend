import { url } from "..";
import { post } from "../fetch";

export async function createUser(userName, password, avatar) {
    let response = await post(`${url}/signup`, {
        userName,
        password,
        avatar,
    });

    response = await response.json();

    return response;
}
