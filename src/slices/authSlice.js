import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:'authentication',
    initialState:{
        analytics:0,
        name:'authentication',
    },
    reducers:{}
})

export default authSlice.reducer
