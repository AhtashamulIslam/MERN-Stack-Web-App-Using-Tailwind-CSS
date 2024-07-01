import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{   //Activate when the sign In page loading
              state.loading=true
              state.error=null
        },
        signInSuccess:(state,action)=>{  //When we get a response back after sign In json(rest)
              state.currentUser=action.payload
              state.loading=false
              state.error=null
        },
        signInFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload // Take the error as response when get error at the time of signing in.
        }
        

    }
})

export const { signInStart , signInSuccess , signInFailure} = userSlice.actions
    // The reducer function will be added in userSlice object in actions property
export default userSlice.reducer  // All the functionalities are considered as a reducer.
