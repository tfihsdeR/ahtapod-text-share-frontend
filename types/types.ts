// User Types
export interface IUser {
    id?: string | null;
    email: string | null;
    password?: string | null;
    name?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    image?: string | null;
    updatedBy?: string | null;
    role?: string | null;
}

export type SessionUser = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    role?: string | null | undefined;
    accessToken?: string | null | undefined
} | undefined;

// Error Types
export class CustomError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = 'CustomError';
        this.status = status;
    }
}

export interface IErrorState {
    error?: string | null;
    status?: number | null;
}

// Publication Types
export interface IPost {
    id?: string;
    title: string;
    content: string;
    summary: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    createdByName?: string;
}