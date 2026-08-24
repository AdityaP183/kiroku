import pc from "picocolors";
import { writeToFile } from "./transports.js";

type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

const levelColors: Record<LogLevel, (msg: string) => string> = {
    INFO: pc.green,
    WARN: pc.yellow,
    ERROR: pc.red,
    DEBUG: pc.gray,
};

function formatLog(
    level: LogLevel,
    source: string,
    msg: string,
    date: Date,
): string {
    return `${date.toISOString()} ${level} [${source}] ${msg}`;
}

async function log(
    level: LogLevel,
    source: string,
    msg: string,
): Promise<void> {
    const date = new Date();

    const formattedMsg = formatLog(level, source, msg, date);

    const coloredMsg = levelColors[level](formattedMsg);

    console.log(coloredMsg);

    try {
        await writeToFile(formattedMsg, date);
    } catch (error) {
        console.error(
            pc.red(
                `Failed to write log file: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`,
            ),
        );
    }
}

export const logger = {
    info(source: string, message: string): void {
        void log("INFO", source, message);
    },

    warn(source: string, message: string): void {
        void log("WARN", source, message);
    },

    error(source: string, message: string): void {
        void log("ERROR", source, message);
    },

    debug(source: string, message: string): void {
        void log("DEBUG", source, message);
    },
};
