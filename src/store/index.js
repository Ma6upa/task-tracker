import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./tasksReducer";
import { usersReducer } from "./usersReducer";

const rootReducer = combineReducers({
    tasksReducer,
    usersReducer
})

export const store = configureStore({
    reducer: rootReducer
})
