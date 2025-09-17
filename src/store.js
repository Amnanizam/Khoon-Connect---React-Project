import { configureStore } from "@reduxjs/toolkit";
import analyticReducer from './slices/analyticsSlice'
import authReducer from './slices/authSlice'
import eventReducer from './slices/eventSlics'
import notificationReducer from './slices/notificationSlice'
import requestReducer from './slices/requestSlice'
import userReducer from './slices/userSlice'

const store=configureStore({
    reducer:{
        analytics:analyticReducer,
        authentication:authReducer,
        event:eventReducer,
        notification:notificationReducer,
        request:requestReducer,
        user:userReducer



    },
});

export default store;