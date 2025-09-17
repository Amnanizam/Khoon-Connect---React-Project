import { configureStore } from "@reduxjs/toolkit";
import {analyticSlice} from './slices/analyticsSlice'
import {authSlice} from './slices/authSlice'
import {eventSlice} from './slices/eventSlics'
import {notificationSlice} from './slices/notificationSlice'
import {requestSlice} from './slices/requestSlice'
import {userSlice} from './slices/userSlice'

const store=configureStore({
    reducer:{

    }
})

export default store;