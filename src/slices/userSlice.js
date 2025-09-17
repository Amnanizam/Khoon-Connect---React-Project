import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:'user',
    initialState:{
        analytics:0,
        name:'user',
    },
    reducers:{}
})

export default userSlice.reducer
