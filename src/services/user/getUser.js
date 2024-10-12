import { url } from "..";
import { post } from "../fetch";

export async function getUser(userName, password) {
    let response = await post(`${url}/login`, { userName, password });

    response = await response.json();

    return response;
}
