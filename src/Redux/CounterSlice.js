import { createSlice } from "@reduxjs/toolkit";

let initialState = {count:0,userName:""};

let counterSlice = createSlice({
     name:"counterSlice",
     initialState,
     reducers:{
        increase(state){
            state.count+=1;
            console.log("increase");
        },
        decrease(state){
            state.count-=1;
            console.log("decrease");
        },
        increaseByAmount(state,actions){
            state.count += actions.payload;
        }
     }
})

export let counterReducer = counterSlice.reducer

export let {increase,decrease,increaseByAmount} = counterSlice.actions;