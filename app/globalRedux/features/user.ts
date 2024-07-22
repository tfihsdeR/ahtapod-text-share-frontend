import { IUser } from '@/types/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
    user?: IUser;
    users?: IUser[];
    loading: boolean;
    error?: string;
}

interface IUserReturn {
    user?: IUser;
    users?: IUser[];
    success: boolean;
    error?: {
        message: string;
        statusCode: number;
    };
    message?: string;

}

const initialState: IUserState = {
    user: undefined,
    users: [],
    loading: false,
    error: undefined,
};

export const readAllUsers = createAsyncThunk(
    'user/readAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const options: RequestInit = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/readAll`, options)

            const data: IUserReturn = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.error)
            }

            return data

        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

export const createUser = createAsyncThunk(
    'user/createUser',
    async (user: IUser, { rejectWithValue }) => {
        try {
            const options: RequestInit = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/create`, options)

            const data: IUserReturn = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.error)
            }

            return data

        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            // Read All Users
            .addCase(readAllUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(readAllUsers.fulfilled, (state, action: PayloadAction<IUserReturn>) => {
                state.loading = false
                state.users = action.payload.users
            })
            .addCase(readAllUsers.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })

            // Create User
            .addCase(createUser.pending, (state) => {
                state.loading = true
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<IUserReturn>) => {
                state.loading = false
                state.user = action.payload.user
            })
            .addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
    }
});

export const { clearError } = userSlice.actions

export default userSlice.reducer