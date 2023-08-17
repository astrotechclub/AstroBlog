const { createLogger, transports, format } = require("winston");

const logger = createLogger({
    transports: [
        new transports.File({
            level: "error",
            filename: "Logs/errors.log"
        }),
        new transports.File({
            level: "warn",
            filename: "Logs/warnings.log"
        }),
        new transports.File({
            level: "http",
            filename: "Logs/requets.log"
        }),
    ],
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json(),
    ),
});


module.exports = logger;



