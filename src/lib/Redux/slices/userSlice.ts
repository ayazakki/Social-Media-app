import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next/client";

const initialState: UserSlice = { user: null };
export const getUserData=createAsyncThunk("userSlice/getUserData",()=>{
  return axios.get("https://linked-posts.routemisr.com/users/profile-data",{
    headers:{
      token:getCookie("token")
    }
  })
  .then(({data})=>data)
});
const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(getUserData.fulfilled,function(state,action){
      state.user=action.payload.user
      // console.log(action);
      
    })
  },
});

export const userReducer=userSlice.reducer
