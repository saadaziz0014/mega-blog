import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: false,
    user: null,
    post: []
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.login = true
            state.user = action.payload
        },
        logout: (state) => {
            state.login = false
            state.user = null
        },
        addPost: (state, action) => {
            let post = action.payload.post;
            state.post.push(post)
        },
        removePost: (state, action) => {
            let userID = action.payload.userID;
            state.post = state.post.filter(post => post.userID === userID)
            return state
        }
    }
})

export const { login, logout, addPost, removePost } = userSlice.actions;

export default userSlice.reducer