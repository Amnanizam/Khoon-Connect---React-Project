import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import requestsReducer from "./slices/requestSlice";
import donationsReducer from "./slices/donationSlice";
import inventoryReducer from "./slices/inventorySlice";
import usersReducer from "./slices/userSlice";
import notificationsReducer from "./slices/notificationSlice";
import analyticsReducer from "./slices/analyticsSlice"


const store=configureStore({
    reducer:{
        analytics: analyticsReducer,
        auth:authReducer,
       requests: requestsReducer,
    donations: donationsReducer,
    inventory: inventoryReducer,
    users: usersReducer,
    notifications: notificationsReducer,


    },
});

export default store;