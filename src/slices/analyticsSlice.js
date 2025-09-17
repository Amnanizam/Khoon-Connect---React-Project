import { createSlice } from "@reduxjs/toolkit"

const analyticsSlice = createSlice({
    name:'analytics',
    initialState:{},
    reducers:{
         setData:(state,action)=>{
            state.date=action.payload;
         },
    },
});

export const {setData}=analyticsSlice.actions;

export default analyticsSlice.reducer;
