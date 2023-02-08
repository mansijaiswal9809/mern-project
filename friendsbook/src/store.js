import {configureStore} from '@reduxjs/toolkit'
import postReducer from "./reducer/posts"

export const store= configureStore({
    reducer:{
        posts:postReducer
    }
})