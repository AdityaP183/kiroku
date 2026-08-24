import path from "node:path";

export function getLogFilePath(date: Date): string {
    const year = date.getFullYear();

    const month = date.toLocaleDateString("en-US", {
        month: "long",
    });

    const week = Math.ceil(date.getDate() / 7);

    return path.join(
        process.cwd(),
        "logs",
        String(year),
        month,
        `week${week}.log`,
    );
}
