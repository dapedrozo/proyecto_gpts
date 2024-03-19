import { createSlice } from '@reduxjs/toolkit'

const initialState = {token: null, user:null, errors: []}

export const persistLocalStorage = (key, value) =>{
    localStorage.setItem(key, value)
}

export const clearLocalStorage = () =>{
    localStorage.removeItem('token') 
    localStorage.removeItem('user')
}

export const authSlice = createSlice({
    name:"auth",
    initialState: (localStorage.getItem('token') && localStorage.getItem('user')) 
                    ? {token: localStorage.getItem('token'), user: localStorage.getItem('user'), errors: []} 
                    : initialState,
    reducers:{
        errorRegister: (state, action) => {
            const {error} = action.payload
            Array.isArray(error) 
            ? error.length>0 
                ? state.errors.push(error) 
                : state.errors = [] 
            : state.errors.push(error.message)
        },
        loginUser: (state, action) => {
            const {data} = action.payload
            state.user = data
        },
        loginToken: (state, action) => {
            state.token = action.payload
        },
        logoutUser: (state)=>{
            state.token = null
            state.user = null
            state.errors = []
            clearLocalStorage()
        },
    }
})

export const {errorRegister, loginUser, loginToken, logoutUser} = authSlice.actions
export default authSlice.reducer
