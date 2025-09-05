export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: any;
    constructor(message: string, statusCode: number, isOperational = true, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype)
        Error.captureStackTrace(this, this.constructor)
    }
}

//Not found error
export class NotFoundError extends AppError {
    constructor(message = "Resources not found") {
        super(message, 404);
    }
}
// Validation Error
export class ValidationError extends AppError {
    constructor(message = "Invalid request data", details?: any) {
        super(message, 400, true, details)
    }
}

//Authentication Error
export class AuthenticationError extends AppError {
    constructor(message = "Unauthorizes") {
        super(message, 401)
    }
}


//Forbidden Error 
export class ForbiddenError extends AppError {
    constructor(message = "Forbidden access") {
        super(message, 403)
    }
}

//Database Error
export class DatabaseError extends AppError {
    constructor(message = "Database Error", details?: any) {
        super(message, 500, true, details)
    }
}


//Rate limit Error 
export class RateLimitError extends AppError {
    constructor(message = "Too many requests, please try again later") {
        super(message, 429)
    }
}
