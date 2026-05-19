export default class AuthError extends Error {
    constructor(message,stsatusCode) {
        super(message);
        this.name = "CustomError";
        this.stsatusCode = stsatusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}