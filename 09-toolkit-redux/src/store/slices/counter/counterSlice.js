import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counter: 10
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.counter++;
        },
        incrementBy: (state, action) => {
            state.counter += action.payload;
        },
        decrement: (state) => {
            state.counter--;
        }
    }
});

export const { increment, incrementBy, decrement } = counterSlice.actions;