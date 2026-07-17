import { configureStore } from '@reduxjs/toolkit'
import pdfReducer from './pdfSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    pdf:pdfReducer,
    user:userReducer,
  },
})