import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./tasksReducer";

const rootReducer = combineReducers({
    tasksReducer,
})

export const store = configureStore({
    reducer: rootReducer
})
