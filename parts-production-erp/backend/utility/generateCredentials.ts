

export const createUserID = (name: string) => {
    const random = Math.floor(Math.random() * 100);
    const userID = `EMP_${random}_${name}`;
    return userID;
}