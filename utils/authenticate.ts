import { IUser } from "@/types/types";
import { User } from "next-auth";

interface IUserResponse {
    user: IUser,
    success: string,
}

export const createUserUtil = async (user: User | IUser): Promise<IUserResponse> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();

        const res: IUserResponse = {
            user: data.user,
            success: data.status,
        }

        return res;

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const readUserUtil = async (user: User): Promise<IUserResponse> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/readbyemail/${user.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        const res: IUserResponse = {
            user: data.user,
            success: data.success
        }

        return res;

    } catch (error: any) {
        throw new Error(error.message);
    }
}