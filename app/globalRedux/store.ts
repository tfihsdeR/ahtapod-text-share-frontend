'use client'

import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit"
import postSlice from "./features/post"
import userSlice from "./features/user"

export const store = configureStore({
    reducer: {
        post: postSlice,
        user: userSlice,
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>