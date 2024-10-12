import { post } from "./post";

export async function postWithAuthToken(url, data) {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        data.accessToken = accessToken;
        const response = await post(url, data);
        return response;
    }

    window.history.pushState({}, "redirect", "/");
    window.location.reload();
}
