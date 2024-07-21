import { IPost } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPostState {
    post?: IPost;
    posts?: IPost[];
    loading: boolean;
    error?: string;
}

interface IPostReturn {
    post?: IPost;
    posts?: IPost[];
    success: boolean;
    error?: {
        message: string;
        statusCode: number;
    }
    message?: string;
}

const initialState: IPostState = {
    post: undefined,
    posts: [],
    loading: false,
    error: undefined,
}

export const createPost = createAsyncThunk(
    'post/create',
    async ({ post }: { post: IPost }, { rejectWithValue }) => {
        try {
            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // This is now correctly typed
                body: JSON.stringify(post),
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/create`, options)

            const data: IPostReturn = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.error)
            }

            return data

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const readPosts = createAsyncThunk(
    'post/readPosts',
    async (_, { rejectWithValue }) => {
        try {
            const options: RequestInit = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/readAll`, options)

            const data: IPostReturn = await response.json()

            if (!response.ok) {
                return rejectWithValue(data.error)
            }

            return data

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost: (state, action: PayloadAction<IPost>) => {
            state.post = action.payload
        },
        setPosts: (state, action: PayloadAction<IPost[]>) => {
            state.posts = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(createPost.fulfilled, (state, action: PayloadAction<IPostReturn>) => {
                state.loading = false
                state.post = action.payload.post
            })
            .addCase(createPost.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
            .addCase(readPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(readPosts.fulfilled, (state, action: PayloadAction<IPostReturn>) => {
                state.loading = false
                state.posts = action.payload.posts
            })
            .addCase(readPosts.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message
            })
    }
})

export default postSlice.reducer