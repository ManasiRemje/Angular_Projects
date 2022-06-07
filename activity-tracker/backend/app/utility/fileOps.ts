import fs from "fs";

export const createDirectory = (path: string) => {
    try {
        if (!fs.existsSync(path))
            fs.mkdirSync(path);
    } catch (error) {
        throw error;
    }
};