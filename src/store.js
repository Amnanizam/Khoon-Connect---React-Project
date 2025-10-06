import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import requestsReducer from "./slices/requestsSlice";
import donationsReducer from "./slices/donationsSlice";
import inventoryReducer from "./slices/inventorySlice";
import usersReducer from "./slices/usersSlice";
import notificationsReducer from "./slices/notificationsSlice";


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