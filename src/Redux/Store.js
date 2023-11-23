import { counterReducer } from "./CounterSlice";

const { configureStore } = require("@reduxjs/toolkit");

export let store  = configureStore({
    reducer:{
        //waiting a reducer 
        counter:counterReducer
    }
})

