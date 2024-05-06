import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISampleState {
    sample: string;
}

const initialState: ISampleState = {
    sample: "",
};

const sampleSlice = createSlice({
    name: "sample",
    initialState,
    reducers: {
        setSample: (state, action: PayloadAction<string>) => {
            state.sample = action.payload;
        },
    },
});

export const sampleReducer = sampleSlice.reducer;
