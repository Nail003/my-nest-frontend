export function getChatName(firstUser, secondUser) {
    if (firstUser > secondUser) {
        firstUser, (secondUser = secondUser), firstUser;
    }
    return `${firstUser} ${secondUser}`;
}
