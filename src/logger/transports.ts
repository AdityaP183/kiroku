import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { getLogFilePath } from "./log-path.js";

export async function writeToFile(message: string, date: Date): Promise<void> {
    const filePath = getLogFilePath(date);

    await mkdir(path.dirname(filePath), {
        recursive: true,
    });

    await appendFile(filePath, `${message}\n`, "utf8");
}
